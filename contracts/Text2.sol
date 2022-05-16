// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@opengsn/contracts/src/BaseRelayRecipient.sol';
import './lib/EIP712MetaTransaction.sol';

contract Text2 is EIP712MetaTransaction("Text2","1") {
	string public text;
	address public admin;
	modifier onlyAdmin() {
		require(admin == msgSender(), 'Only admin can call this function');
		_;
	}

	constructor() {
		admin = msg.sender;
	}

	function setText(string memory _text) public {
		text = _text;
	}

}
