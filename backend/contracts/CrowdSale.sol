// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./interfaces/ITicketConsumer.sol";




contract CrowdSale is Context,Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    ITicketConsumer ticketConsumer;
    //owner
    address public token_Owner;

    modifier onlyTokenOwner() {
        require(token_Owner == _msgSender(), "Ownable: caller is not the Token owner");
        _;
    }
    
    // The token being sold
    IERC20 private token;
    IERC20 private BUSD;

    // Address where funds are collected
    address payable private wallet;
    address payable public _manager;
    //status
    //whitelist soon 0
    //whitelist open 1
    //sale wait 2
    //sale start 3
    //sale end 4
    //destribution 5
    //uint8 public status;
    //Time
    //default
    uint256 DEFAULT_SALE_ENDTIME = 4 weeks;
    uint256 DEFAULT_TOKEN_DESTRIBUTIONTIME = 4 weeks;
    uint256 DEFAULT_WHITELIST_STARTTIME;
    uint256 DEFAULT_WHITELIST_ENDTIME;
    //custom
    uint256 public CUSTOM_WHITELIST_STARTTIME;
    uint256 public CUSTOM_WHITELIST_ENDTIME;
    uint256 public CUSTOM_SALE_STARTTIME;
    uint256 public CUSTOM_SALE_ENDTIME;
    uint256 public CUSTOM_TOKEN_DESTRIBUTIONTIME;
    //price
    uint256 public token_Price;
    uint256 public tokenAllocation;
    uint256 public total_amount;

    //whiteList users
    uint256 public TOTAL_WHITELIST;
    mapping(address => bool) private isWhitelisted;

    // How many token units a buyer gets per wei.
    // The rate is the conversion between wei and the smallest and indivisible token unit.
    // So, if you are using a rate of 1 with a ERC20Detailed token with 3 decimals called TOK
    // 1 wei will give you 1 unit, or 0.001 TOK.
    uint256 private _rate;
    uint256 public min;
    uint256 public minBuy = 215 ether;
    uint256 public maxBuy = 430 ether;
    uint256 public sale_price;
    

    // Amount of wei raised
    uint256 public _weiRaised;
    uint256 public _tokenPurchased;
    bool public success;
    bool public finalized;
    

    
    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    
    
    mapping (address => uint256) purchase;
    mapping (address => uint256) msgValue; 
    mapping (address => bool) claimed;

    uint256 current = block.timestamp * 1 seconds;
    uint256 public buyTime = block.timestamp + 500 seconds;//+ 15 days
    

    constructor(uint256 _salePrice,
                address _token,address payable _wallet,
                address _tokenOwner,uint256 _totalAmount ,address _ticketConsumer, address addrBusd){
        token_Price = _salePrice;
        token = IERC20(_token);
        wallet = _wallet;
        token_Owner = _tokenOwner;
        total_amount = _totalAmount;

        BUSD = IERC20(addrBusd);
        //0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
        setTicketConsumer(_ticketConsumer);
    }
    
    function token_addr() public view returns(address){
        return address(token);
    }

    function setTime(uint256 _wstartTimes,uint256 _wstartTimee,uint256 _sstartTimes,uint256 _sstartTimee,
                uint256 _dstartTime) public onlyOwner{
        uint256 one_day = (1 seconds); //(1 days * 1 seconds)-(1 seconds)   
        CUSTOM_WHITELIST_STARTTIME = block.timestamp + _wstartTimes;
        CUSTOM_WHITELIST_ENDTIME = block.timestamp + _wstartTimes + _wstartTimee;
        require(CUSTOM_WHITELIST_ENDTIME - CUSTOM_WHITELIST_STARTTIME >= one_day , "please set whitelist time ending period greater than 1 day");
        CUSTOM_SALE_STARTTIME = block.timestamp + _wstartTimes + _wstartTimee + _sstartTimes;
        CUSTOM_SALE_ENDTIME = block.timestamp + _wstartTimes + _wstartTimee + _sstartTimes + _sstartTimee;
        require(CUSTOM_SALE_ENDTIME - CUSTOM_SALE_STARTTIME >= one_day ,"please set sale time ending period greater than 1 day");
        CUSTOM_TOKEN_DESTRIBUTIONTIME = block.timestamp + _wstartTimes + _wstartTimee + _sstartTimes + _sstartTimee + _dstartTime;
    }

    

    function setTicketConsumer(address _ticketConsumer) public onlyOwner{
        ticketConsumer = ITicketConsumer(_ticketConsumer);
    }

    function getStatus() public view returns(uint8){
        if(block.timestamp < CUSTOM_WHITELIST_STARTTIME){
            return 0;
        }else if(block.timestamp>CUSTOM_WHITELIST_STARTTIME && block.timestamp <= CUSTOM_WHITELIST_ENDTIME){
            return 1;
        }else if(block.timestamp>CUSTOM_WHITELIST_ENDTIME  && block.timestamp<= CUSTOM_SALE_STARTTIME){
            return 2;
        }else if(block.timestamp>CUSTOM_SALE_STARTTIME  && block.timestamp<= CUSTOM_SALE_ENDTIME){
            return 3;
        }else if(CUSTOM_SALE_ENDTIME != CUSTOM_TOKEN_DESTRIBUTIONTIME){
            if(block.timestamp>CUSTOM_SALE_ENDTIME  && block.timestamp<= CUSTOM_TOKEN_DESTRIBUTIONTIME){
                return 4;
            }else{
                return 5;
            }       
        }else{
            return 5;
        }
    }

    function getSaleEndTime() public view returns(uint256){
        if(CUSTOM_SALE_ENDTIME != 0){
            return CUSTOM_SALE_ENDTIME;
        }else{
            return DEFAULT_SALE_ENDTIME;
        }
    }

    function getdistributionTime() public view returns(uint256){
        if(CUSTOM_TOKEN_DESTRIBUTIONTIME != 0){
            return CUSTOM_TOKEN_DESTRIBUTIONTIME;
        }else{
            return DEFAULT_TOKEN_DESTRIBUTIONTIME;
        }
    }
            // 1 hours --do
    function setEnd_Destribution_Time(uint256 _end , uint256 _distribution) public onlyTokenOwner{
        require(block.timestamp + 1 seconds < CUSTOM_SALE_STARTTIME,"Time limit reached");
        require(_end <=_distribution,"destribution time must be greater than end time");
        CUSTOM_SALE_ENDTIME = block.timestamp + _end;
        CUSTOM_TOKEN_DESTRIBUTIONTIME = block.timestamp + _distribution;
    }
            // 1 hours --do
    function getWhitlisted() public {
        require(isWhitelisted[_msgSender()] == false,"already applied for whitelisted");
        require(getStatus() == 1,"Time limit reached");
        isWhitelisted[_msgSender()] = true;
        TOTAL_WHITELIST++;
        require(total_amount / TOTAL_WHITELIST > 0 ,"whiteListing finished");
        tokenAllocation = total_amount / TOTAL_WHITELIST;
        ticketConsumer.lockTickets(_msgSender(), address(this));
    }

    function wallet_address() public view returns (address payable) {
        return wallet;
    }

    
    function rate() public view returns (uint256) {
        return _rate;
    }
    function getPrice() public view returns(uint256){
        return token_Price;
    }

    function getClaimed(address account) public view returns(bool){
        return claimed[account];
    }

   
    function weiRaised() public view returns (uint256) {
        return _weiRaised;
    }

    
    
    
    function buyTokens() public nonReentrant payable {
        require ( getStatus() == 3, "Buy Time expired");

        uint256 weiAmount = BUSD.allowance(_msgSender(), address(this));
      
        
        //new calulate amount
        uint8 dec = IERC20Metadata(address(token)).decimals();
        uint256 one = 1 *10**dec;
        uint256 product = one * weiAmount;
        require(product >= token_Price,"please buy greater than min");
        uint256 tokens =  (one * weiAmount) / token_Price;

        require(tokens <=tokenAllocation,"please approve Busd according to limit");
       
        require(token.balanceOf(address(this)) >= tokens,"buy amount exceeds not enough Tokens remaining");
        BUSD.safeTransferFrom(_msgSender(),address(this), weiAmount);
        _tokenPurchased = _tokenPurchased + tokens;

        // update state
        _weiRaised = _weiRaised.add(weiAmount);
        
        msgValue[_msgSender()] = msgValue[_msgSender()] + weiAmount;
        purchase[_msgSender()]=purchase[_msgSender()] + tokens;
       
    }
    
    function claim() public payable {
        require (getStatus() == 5);
 
        uint256 t = purchase[_msgSender()]; 
        require (t>0,"0 tokens to claim");
         ticketConsumer.unlockTickets(_msgSender(), address(this));
        _processPurchase(_msgSender(), t);
        claimed[_msgSender()] =true;
         delete purchase[_msgSender()];
     
    }
    
    function balance() public view returns(uint){
        return token.balanceOf(address(this));
    }

    function Finalize() public  returns(bool) {
        require( getStatus() >= 4 , "the crowdSale is in progress");
        require(!finalized,"already finalized");
        require(_msgSender() == wallet,"you are not the owner");

        if(_weiRaised >= min ) {
            success = true;
        }
        else{
             success = false;   
        }

        uint256 remainingTokensInTheContract = token.balanceOf(address(this)) - _tokenPurchased;
        token.safeTransfer(address(token_Owner),remainingTokensInTheContract);
        _forwardFunds(_weiRaised);
        finalized = true;
        return success;
    }


    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
        token.safeTransfer(beneficiary, tokenAmount);
    }

   
    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        _deliverTokens(beneficiary, tokenAmount);
    }

    function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal {
        // solhint-disable-previous-line no-empty-blocks
    }

  
    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(_rate);
    }

   
    function _forwardFunds(uint256 amount) internal {
      //  _wallet.transfer(amount);
      BUSD.safeTransfer(wallet, amount);
    }

    function time()public view returns(uint256){ 
        return block.timestamp;
    } 
      
}