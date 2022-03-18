// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "./Staking.sol";
import "./interfaces/IFactory.sol";
import "./interfaces/IStaking.sol";
import "./interfaces/ITicketConsumer.sol";

contract TicketConsumer is ITicketConsumer, Context ,Ownable, ReentrancyGuard { 

    IFactory factory;
    IStaking staking;
 

 modifier onlyCallers() {
        require(factory.getIdoExist(_msgSender()), "Ownable: caller is not the Token owner");
        _;
    }



    mapping(address => uint256) private userLockedTickets;
    mapping(address => address[]) private userLockedidos;

    
    
    function getUserAppliedProjects(address account) public view returns (address[] memory){
        return userLockedidos[account];
    } 
    function lockTickets(address account,address ido) public override onlyCallers {
        address caller = _msgSender();
        staking.consumetickets(account, 1);
        userLockedTickets[account] = userLockedTickets[account]  + 1;
        userLockedidos[account].push(caller);
    }

    function unlockTickets(address account,address ido) public override onlyCallers {
        staking.releasetickets(account, 1);
        userLockedTickets[account] = userLockedTickets[account]  - 1;
    }

    function setFactory(address _factory) public onlyOwner{
        require(msg.sender != _factory,"set Actual factory address");
        factory = IFactory(_factory);
    }

    function setStaking(address _staking) public onlyOwner{
        require(msg.sender != _staking,"set Actual factory address");
        staking = IStaking(_staking);
    }


}