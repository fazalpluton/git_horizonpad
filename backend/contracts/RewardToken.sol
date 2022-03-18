// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract RewardToken is ERC20 ,Ownable{ // change the name

address public minter;
constructor () ERC20("RZPad", "RZ") {}


 modifier onlyMinter() {
        require(minter == _msgSender(), "Ownable: caller is not the minter");
        _;
    }
   

function setMinter(address _minter)public onlyOwner{
    minter = _minter;
}

function mint(address to,uint256 amount)public onlyMinter{
    _mint(to,amount);
}

}