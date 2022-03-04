// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

interface IFactory{
   function getIdoExist(address _ido) external view returns(bool);
}