// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


interface IGreetUser {
  function admin (  ) external view returns ( address );
  function getUserCount (  ) external view returns ( uint256 );
  function getUserPublicDetailsByAddress ( address _userAddress ) external view returns ( uint256 _id, string memory _userName );
  function isRegistered ( address _userAddress ) external view returns ( bool );
  function isTrustedForwarder ( address forwarder ) external view returns ( bool );
  function registerNewUser ( string memory _userName ) external;
  function setTrustForwarder ( address _trustedForwarder ) external;
  function trustedForwarder (  ) external view returns ( address );
  function uniqueUserName ( string memory ) external view returns ( address );
  function userIndex ( address ) external view returns ( uint256 );
  function users ( address ) external view returns ( address userAddress, uint256 id, string memory userName, uint256 followersCount, uint256 followingCount );
  function usersList ( uint256 ) external view returns ( address userAddress, uint256 id, string memory userName, uint256 followersCount, uint256 followingCount );
  function versionRecipient (  ) external pure returns ( string memory);
}
