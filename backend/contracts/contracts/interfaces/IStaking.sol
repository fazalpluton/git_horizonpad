// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

interface IStaking{
   function consumetickets(address account , uint256 amount) external;
   function releasetickets(address account , uint256 amount) external;
}