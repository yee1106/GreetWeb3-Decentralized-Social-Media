// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@opengsn/contracts/src/BaseRelayRecipient.sol';

contract Text is BaseRelayRecipient {
	string public text;
	address public admin;
	modifier onlyAdmin() {
		require(admin == _msgSender(), 'Only admin can call this function');
		_;
	}

	constructor(address _trustedForwarder) {
		_setTrustedForwarder(_trustedForwarder);
		admin = msg.sender;
	}

	function setText(string memory _text) public {
		text = _text;
	}

	function setTrustedForwarder(address _trustedForwarder) public onlyAdmin {
		_setTrustedForwarder(_trustedForwarder);
	}

	function versionRecipient() external pure override returns (string memory) {
		return '1';
	}
}
