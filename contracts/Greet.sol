// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@opengsn/contracts/src/BaseRelayRecipient.sol';
import './IGreetUser.sol';

contract Greet is ERC1155Burnable, BaseRelayRecipient {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIdCounter;
	address public greetUserContractAddress;
	address public admin;
	
	event GreetCreated(uint256 indexed id, uint256 indexed timestamp, address indexed creator, string uri);

	modifier onlyRegisteredUser(address _userAddress) {
		require(
			IGreetUser(greetUserContractAddress).isRegistered(_userAddress),
			'Only registered user can call this function'
		);
		_;
	}

	modifier onlyCreator(address _userAddress, uint256 _tokenId) {
		require(
			greetCreators[_tokenId] == _userAddress,
			'Only the creator for this greet can edit the Greet'
		);
		_;
	}

	modifier onlyCreatorAndAdmin(address _userAddress, uint256 _tokenId) {
		require(
			greetCreators[_tokenId] == _userAddress || _userAddress == admin,
			'Only creator or admin can edit the Greet'
		);
		_;
	}

	modifier onlyAdmin() {
		require(admin == msg.sender, 'Only admin can call this function');
		_;
	}

	//URI for each Greet
	mapping(uint256 => string) private _tokenURIs;

	//Creator for each token ID (Post)
	mapping(uint256 => address) public greetCreators;

	//Timestamp for each Greet creation
	mapping(uint256 => uint256) public mintedTimestamp;


	constructor(address _greetUserContractAddress, address _trustedForwarder) ERC1155('') {
		greetUserContractAddress = _greetUserContractAddress;
		admin = msg.sender;
		_setTrustedForwarder(_trustedForwarder);
	}

	function uri(uint256 tokenId) public view override returns (string memory) {
		return (_tokenURIs[tokenId]);
	}

	function setTokenUri(uint256 tokenId, string memory _tokenURI)
		public
		onlyCreatorAndAdmin(_msgSender(), tokenId)
	{
		_tokenURIs[tokenId] = _tokenURI;
	}


  //mint a new greet token
	function mint(
		uint256 amount,
		string calldata _tokenUri
	) public  onlyRegisteredUser(_msgSender()) returns(uint256) {
		_tokenIdCounter.increment();
		uint256 id = _tokenIdCounter.current();

		greetCreators[id] = _msgSender();

		setTokenUri(id, _tokenUri);
		_mint(_msgSender(), id, amount, "");
		uint256 timestamp = block.timestamp;
		mintedTimestamp[id] = timestamp;
		emit GreetCreated(id, timestamp, _msgSender(), _tokenUri);
		return id;
	}


	function setTrustedForwarder(address _trustedForwarder) public onlyAdmin {
		_setTrustedForwarder(_trustedForwarder);
	}

	function versionRecipient() external pure override returns (string memory) {
		return '1';
	}

	function _msgData()
		internal
		view
		override(BaseRelayRecipient, Context)
		returns (bytes calldata ret)
	{
		return BaseRelayRecipient._msgData();
	}

	function _msgSender()
		internal
		view
		override(BaseRelayRecipient, Context)
		returns (address)
	{
		return BaseRelayRecipient._msgSender();
	}

	function setGreetUserContractAddress(address _address) public onlyAdmin {
		greetUserContractAddress = _address;
	}
}
