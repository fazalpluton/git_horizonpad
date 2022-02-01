// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "./RewardToken.sol";
import "./interfaces/IStaking.sol";

contract Staking is IStaking, Context, Ownable , ReentrancyGuard {
    
    using SafeERC20 for IERC20;

    address ticketConsumer;

    RewardToken public rewardsToken;
    IERC20 public stakingToken;

    //sig
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
    mapping(address => uint) public nonces;
    //
    struct stakingDetail{

        uint256 depositValue; 
        uint256 depositBlock; 
        uint256 withdrawBlock; 
        uint256 pendingRewards; 
        uint256 withDrawValue; 
        uint256 noHasStaked; 
        uint32 userWeight; 
        uint256 rewardReleased; 
        uint256 stakeTime; 
        uint256 tickets; 

    }

    uint256 public fee;

    //APY

    uint public constant blocksPerYear = 2102400;
    uint public multiplierPerBlock;
    uint public baseRatePerBlock;
    uint256 public noOfStakers;

    

    //Tier
    uint256 public bronze = 30000 ether;
    uint256 public silver = 75000 ether;
    uint256 public gold = 170000 ether;
    uint256 public TotalBronze;
    uint256 public totalSilver;
    uint256 public totalGold;
    uint256 public totalStakedValue;
    

    uint32 public bronze_pool_weight = 10;
    uint32 public silver_pool_weight = 32;
    uint32 public gold_pool_weight = 80;

    
    mapping(address => stakingDetail) private userStakingDetail;
    

    //events
    event eve_staked (uint256 amount);
    event eve_Unstaked (uint256 amount);
    event eve_Poolchanged (uint8 pooltype,uint256 amount);

    

    constructor(address _token ,address _rewardToken,uint256 _baseRatePerBlock){
        
        stakingToken = IERC20(_token);
        rewardsToken = RewardToken(_rewardToken);
        baseRatePerBlock = _baseRatePerBlock;
        
    }

    modifier onlyConsumer() {
        require(ticketConsumer == _msgSender(), "Ownable: caller is not the Consumer");
        _;
    }

    function setTicketConsumer(address _consumer) public onlyOwner {
        ticketConsumer = _consumer;
    }

     function getAPY() public view returns(uint256) {
        if(totalStakedValue != 0){
            uint256 a= blocksPerYear * baseRatePerBlock;
            a= a/totalStakedValue;
            a= a*100;
            return a;
        }else{
            return 0;
        }   
        } 

    function calcPendingRewards(address account)public view returns(uint256) {
        stakingDetail memory detail = userStakingDetail[account];
        uint256 currentblock = block.number;
        if(currentblock == detail.depositBlock){
            return 0;
        }
        uint256 blocks = currentblock - detail.depositBlock; 
        uint256 totalReceived = baseRatePerBlock * blocks;
        uint256 userShare = detail.depositValue;
        if(userShare <= 0){
            return  0; 
        }else{
            uint256 rewards = (totalReceived * userShare) / totalStakedValue - detail.rewardReleased ; 
            return rewards ;
        }   
        
    }
    function showPendingRewards(address account)public view returns(uint256) {
        stakingDetail memory detail = userStakingDetail[account];
        uint256 currentblock = block.number;
        if(currentblock == detail.depositBlock){
            return getPendingRewards();
        }
        uint256 blocks = currentblock - detail.depositBlock; 
        uint256 totalReceived = baseRatePerBlock * blocks;
        uint256 userShare = detail.depositValue;
        if(userShare <= 0){
            return  getPendingRewards(); 
        }else{
            uint256 rewards = (totalReceived * userShare) / totalStakedValue - detail.rewardReleased ; 
            return rewards + getPendingRewards();
        }   
        
    }

    function getPendingRewards()public view returns(uint256){
        stakingDetail memory detail = userStakingDetail[_msgSender()];
        return detail.pendingRewards;
    }

    function setPendingRewards(uint256 amount)private {
        stakingDetail memory detail = userStakingDetail[_msgSender()];
        detail.pendingRewards = amount;
        userStakingDetail[_msgSender()] = detail;
    }


    function savePendingRewards() public {
        stakingDetail memory detail = userStakingDetail[_msgSender()];
        uint256 pending = detail.pendingRewards;
        detail.pendingRewards = pending + calcPendingRewards(_msgSender());
        userStakingDetail[_msgSender()] = detail;
    }

    function withdrawRewards()public {
        require(calcPendingRewards(_msgSender()) > 0 , "no rewards to pull");
        savePendingRewards();
        userStakingDetail[_msgSender()].rewardReleased = userStakingDetail[_msgSender()].rewardReleased + getPendingRewards() ;
        rewardsToken.mint(_msgSender(),getPendingRewards());
        setPendingRewards(0);
    }

    function setUsertickets(uint256 amount , address account)private {
        stakingDetail memory detail = userStakingDetail[account];
        detail.tickets = amount;
        userStakingDetail[account] = detail;
    }

    function getUsertickets(address account)public view returns(uint256){
        stakingDetail memory detail = userStakingDetail[account];
        return detail.tickets;
    }

    function consumetickets(address account , uint256 amount)public override onlyConsumer {
        stakingDetail memory detail = userStakingDetail[account];
        require(detail.tickets > 0 && detail.tickets - amount >=0 ,"not enough tickets remaing");
        require(detail.stakeTime + 1 seconds < block.timestamp ,"you can apply for WhiteList after 1 week");
        require(detail.depositValue > bronze ,"you can apply for WhiteList after 1 week"); // 1 week
       // require(getUserStakedValue >= bronze,"you must be at bronze tier to be applicable");
        detail.tickets = detail.tickets - amount;
        userStakingDetail[account] = detail;
    }

    function releasetickets(address account , uint256 amount)public override onlyConsumer {
        stakingDetail memory detail = userStakingDetail[account];
        detail.tickets = detail.tickets + amount;
        userStakingDetail[account] = detail;
    }

    //setter functions
    function setBronzeValue(uint256 _bronze)public onlyOwner{
        bronze = _bronze;
    } 
    function setSilverValue(uint256 _silver)public onlyOwner{
        silver = _silver;
    } 
    function setGoldValue(uint256 _gold)public onlyOwner{
        gold = _gold;
    }
    function setBronzeWeight(uint32 _weight)public onlyOwner{
        bronze_pool_weight = _weight;
    }
    function setSilverWeight(uint32 _weight)public onlyOwner{
        silver_pool_weight = _weight;
    } 
    function setGoldWeight(uint32 _weight)public onlyOwner{
        gold_pool_weight = _weight;
    }

    //getter functions

    function getUserWeight(address account)public view returns(uint32){
        return userStakingDetail[account].userWeight;
    }
    
    function getUserStakedValue(address account)public view returns(uint256){
        return userStakingDetail[account].depositValue;
    } 

    //pool weight

    function getTicketsForUser(uint256 amount) private view returns(uint32){
        uint32 Ticket;
        if(amount>=bronze && amount<silver){
            Ticket =  1;    
        }
        else if(amount>=silver && amount<gold){
            Ticket =  2;
        }
        else if(amount>=gold){
            Ticket =  3;
        }
        else{
            Ticket =  0;
        }
        return Ticket;
    }

   

    function pool_Inc(uint256 amount) private {
        if(amount>=bronze && amount<silver){
            TotalBronze++;
            emit eve_Poolchanged(0,TotalBronze);
        }
        else if(amount>=silver && amount<gold){
            totalSilver++;
            emit eve_Poolchanged(1,totalSilver);
        }
        else if(amount>=gold){
            totalGold++;
            emit eve_Poolchanged(2,totalGold);
        }
    }

    function pool_Dec(uint256 amount) private {
        if(amount>=bronze && amount<silver){
            TotalBronze--;
            emit eve_Poolchanged(0,TotalBronze);
        }
        else if(amount>=silver && amount<gold){
            totalSilver--;
             emit eve_Poolchanged(1,totalSilver);
        }
        else if(amount>=gold){
            totalGold--;
            emit eve_Poolchanged(2,totalGold);
        }
    }

    function getPoolWeight(uint256 amount) private view returns(uint32){
        uint32 weight;
        if(amount>=bronze && amount<silver){
            weight =  gold_pool_weight;
        }
        else if(amount>=silver && amount<gold){
            weight = silver_pool_weight;
        }
        else if(amount>=gold){
            weight = gold_pool_weight;
        }
        else{
            weight = 0;
        }
        return weight;
    }

  
    function stake(uint256 amount) public nonReentrant{ 
        require(amount>=bronze,"insufficient balance for staking");
        require(stakingToken.allowance(_msgSender(),address(this))>=amount,"Approve your token");
        stakingDetail memory detail = userStakingDetail[_msgSender()];
        stakingToken.safeTransferFrom(_msgSender(),address(this),amount);
        uint256 balance = amount + detail.depositValue;
        
        detail.userWeight = getPoolWeight(balance);
        if(detail.noHasStaked>0){
            pool_Dec(detail.depositValue);
        }else{
            detail.stakeTime = block.timestamp;
        }
        detail.tickets = getTicketsForUser(amount);
        pool_Inc(balance);
        savePendingRewards();
        detail.depositValue = balance;
        detail.depositBlock = block.number;
        detail.noHasStaked++;
        detail.userWeight = getPoolWeight(balance);

        userStakingDetail[_msgSender()] = detail;
        totalStakedValue += amount;
        noOfStakers++;
        emit eve_staked(amount);
    }
    

     function unStake(uint256 amount) public nonReentrant{ 
        stakingDetail memory detail = userStakingDetail[_msgSender()];
        uint256 balance =detail.depositValue;
        require(amount<=balance,"insufficient balance for unstaking");
        uint256 newBalance = 0;
        if(block.timestamp < detail.stakeTime + 1 weeks){
            uint256 amount_80 = (amount/100)*80;
            uint256 amount_20 = (amount/100)*20;
            fee += amount_20;
            stakingToken.safeTransfer(_msgSender(),amount_80);
        }else{
            stakingToken.safeTransfer(_msgSender(),amount);
        }
        newBalance = detail.depositValue - amount;
        detail.withDrawValue += amount;
        savePendingRewards();
        pool_Dec(balance);
        if(newBalance==0){
            detail.depositValue = 0;
            detail.withdrawBlock = block.number;
            detail.noHasStaked = 0;
            detail.stakeTime = 0;
        }
        else{ 
            detail.depositValue = newBalance;
            pool_Inc(newBalance);
        }
        detail.userWeight = getPoolWeight(newBalance);
        userStakingDetail[_msgSender()] = detail;
        totalStakedValue -= amount;
        noOfStakers--;
        emit eve_Unstaked(amount);
    }

    function getUnstakedValue(address account)public view returns(uint256){
        stakingDetail memory detail = userStakingDetail[account];
        return detail.withDrawValue;
    }



    function collectFee(address account , uint256 amount)public onlyOwner{
        require(amount <= fee , "Not enough amount to collect");
        stakingToken.safeTransfer(account,amount);
    }
}