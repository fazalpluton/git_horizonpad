// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "./CrowdSale.sol";
import "./Staking.sol";
import "./interfaces/IFactory.sol";


contract Factory is IFactory, Ownable {
    
    using SafeERC20 for IERC20;
    
    address immutable ticketConsumer;
    address public addr_busd ; 
    address public ico_addr;
    address[] public idos;
    address[] private tokens;

    mapping(address=>bool)private ido_exist;
    
    receive () external payable {}

    function total_idos() external view returns(uint256){
        return idos.length;
    }

    function total_tokens() external view returns(uint256){
        return tokens.length;
    }

    function getIdoExist(address _ido) external view override returns(bool){
        return ido_exist[_ido];
    }

    constructor(address _ticketConsumer, address busd){
        ticketConsumer = _ticketConsumer;
        addr_busd = busd;
    }

   
    function setBusdaddress(address busd) public onlyOwner{
           addr_busd = busd;
    }
    
    
   // (uint256 _wstartTimes,uint256 _wstartTimee,uint256 _sstartTimes,uint256 _sstartTimee, uint256 _dstartTime,

    function create_TokenSale(address tokenForSale,address _tokenOwner,
                              uint256 _wstartTimes,uint256 _wstartTimee,
                              uint256 _sstartTimes,uint256 _sstartTimee, 
                              uint256 _dstartTime,uint256 _price,address payable _wallet) public onlyOwner{

        require(tokenForSale != address(0),"set Token forSale");
        uint256 allowedFunds = IERC20(tokenForSale).allowance(_tokenOwner, address(this));
        require(allowedFunds>0,"please approve funds to startsale");
        CrowdSale ico;
        ico = new CrowdSale(_price,tokenForSale,_wallet,_tokenOwner,allowedFunds,ticketConsumer, addr_busd); 
        ico_addr = address(ico);
        ido_exist[ico_addr]=true;
        IERC20(tokenForSale).safeTransferFrom(_tokenOwner,ico_addr,allowedFunds);
        ico.setTime(_wstartTimes, _wstartTimee, _sstartTimes, _sstartTimee, _dstartTime);
        idos.push(ico_addr);
        tokens.push(tokenForSale);
        
    }

}