// contracts/ExampleToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ZPad is ERC20 {
constructor ()
ERC20("ZpadTest", "ZT")
{
    _mint(msg.sender,100000000000 * 10 ** decimals());
    _mint(0x70997970C51812dc3A010C7d01b50e0d17dc79C8,100000000000 * 10 ** decimals());
    
}}