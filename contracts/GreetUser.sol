// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@opengsn/contracts/src/BaseRelayRecipient.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract GreetUser is BaseRelayRecipient {
	address public admin;

	//User ID counter
	using Counters for Counters.Counter;
	Counters.Counter private _userIdCounter;
	Counters.Counter private _userCounter;

	//Modifier
	modifier onlyAdmin() {
		require(admin == _msgSender(), 'Only admin can call this function');
		_;
	}
	modifier onlyRegisteredUser(address _userAddress) {
		require(
			isRegistered(_userAddress),
			'Only registered user can call this function'
		);
		_;
	}

	//Mapping
	mapping(address => userDetail) public users;
	mapping(string => address) public uniqueUserName;
	mapping(address => uint256) public userIndex;

	//Event
	event userRegistered(
		uint256 indexed id,
		address indexed userAddress,
		string userName,
		uint256 timestamp
	);

	//Struct
	struct userDetail {
		address userAddress;
		uint256 id;
		string userName;
	}

	constructor(address _trustedForwarder) {
		admin = msg.sender;
		_setTrustedForwarder(_trustedForwarder);
		registerNewUser('Greet');
	}

	//Function
	function setTrustedForwarder(address _trustedForwarder) public onlyAdmin {
		_setTrustedForwarder(_trustedForwarder);
	}

	function versionRecipient() external pure override returns (string memory) {
		return '1';
	}

	//Register a new user
	function registerNewUser(string memory _userName) public {
		require(bytes(_userName).length > 0, 'User name cannot be empty');
		require(
			!isRegistered(_msgSender()),
			'This address already registered as a user'
		);
		require(!isUserNameTaken(_userName), 'This user name is taken');

		//Increment
		_userIdCounter.increment();
		_userCounter.increment();
		uint256 currentId = _userIdCounter.current();

		userDetail memory newUser = userDetail(
			_msgSender(),
			currentId,
			_userName
		);
		users[_msgSender()] = newUser;

		userIndex[_msgSender()] = currentId;
		uniqueUserName[_userName] = _msgSender();
		emit userRegistered(currentId, _msgSender(), _userName, block.timestamp);
	}

	function isRegistered(address _userAddress) public view returns (bool) {
		return bytes(users[_userAddress].userName).length != 0;
	}


	function isUserNameTaken(string memory _userName)
		internal
		view
		returns (bool)
	{
		return uniqueUserName[_userName] != address(0);
	}

	function getUserPublicDetailsByAddress(address _userAddress)
		public
		view
		returns (uint256 _id, string memory _userName)
	{
		require(users[_userAddress].id != 0, 'This address is not registered');
		_id = users[_userAddress].id;
		_userName = users[_userAddress].userName;
	}

	function getUserCount() public view returns (uint256) {
		return _userCounter.current();
	}
}
