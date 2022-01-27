// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "./CrowdSale.sol";
import "./Staking.sol";
import "./interfaces/IFactory.sol";


contract Factory is IFactory,  Context, Ownable {
    
    using SafeERC20 for IERC20;
    
    address immutable ticketConsumer;
    
    address token_addr;
    address public ico_addr;
    address[] public idos;
    address[] private tokens;

    mapping(address=>bool)private ido_exist;
    
    receive () external payable {}

    function total_idos() public view returns(uint256){
        return idos.length;
    }

    function total_tokens() public view returns(uint256){
        return tokens.length;
    }

    function setToken(address token_) public onlyOwner{
        token_addr = token_;
    }
    function getToken() public view returns(address){
          return token_addr;
    }
    function getIdoExist(address _ido) public view override returns(bool){
        return ido_exist[_ido];
    }

    constructor(address _ticketConsumer){
        ticketConsumer = _ticketConsumer;
    }

    
    
    

    function create_TokenSale(address tokenForSale,address _tokenOwner,uint256 _startTime,uint256 _price,address payable _wallet) public onlyOwner returns(address){
        require(tokenForSale != address(0),"set Token forSale");
        uint256 allowedFunds = IERC20(tokenForSale).allowance(_tokenOwner, address(this));
        require(allowedFunds>0,"please approve funds to startsale");
        CrowdSale ico;
        ico = new CrowdSale(_startTime,_price,tokenForSale,_wallet,_tokenOwner,ticketConsumer,allowedFunds); 
        ico_addr = address(ico);
        ido_exist[ico_addr]=true;
        IERC20(tokenForSale).safeTransferFrom(_tokenOwner,ico_addr,allowedFunds);
        idos.push(ico_addr);
        tokens.push(tokenForSale);
        return ico_addr;
    }

}
