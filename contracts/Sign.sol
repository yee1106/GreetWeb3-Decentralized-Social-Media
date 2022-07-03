// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";


contract Sign{
  //string text;
  using ECDSA for bytes32;
  using ECDSA for bytes;
  using console for *;
  address public _address;
  bytes private constant message = bytes("test");

  function recoverWithSig(bytes32 sigR, bytes32 sigS, uint8 sigV) public{
    
    bytes32 _msg = 0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658;
    _msg.logBytes32();
    _msg.toEthSignedMessageHash().logBytes32();
    _address = ecrecover(_msg.toEthSignedMessageHash(), sigV, sigR, sigS);
    

  }
  function recoverWithSig2(bytes32 _hash,bytes32 sigR, bytes32 sigS, uint8 sigV)public{
    _hash.logBytes32();
    _address = ecrecover(_hash,sigV,sigR,sigS );
  }
  function recoverWithSig3(bytes memory sig) public{
    //bytes32 _hash = 0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658;
    bytes32 digest = ECDSA.toEthSignedMessageHash("0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658");
    _address = ECDSA.recover(digest, sig);
  }

  function recoverWithSig4(bytes32 _hash,bytes memory signature) public{
    _address = _hash.recover(signature);
  }

  function prefixed (bytes memory s) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", Strings.toString(s.length), s));
  }
}