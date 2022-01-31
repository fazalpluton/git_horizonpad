// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //       "gets automatically created and destroyed every time. Use the Hardhat" +
  //       " option '--network localhost'"
  //   );
  // }

  // ethers is avaialble in the global scope
  const [deployer,per1,per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());


  ZPad = await ethers.getContractFactory("ZPad");
  zpad = await ZPad.deploy();
  await zpad.deployed();

  RewardToken = await ethers.getContractFactory("RewardToken");
  rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();

  TokenForSale = await ethers.getContractFactory("ZPad");
  tokenForSale = await TokenForSale.deploy();
  await tokenForSale.deployed();

  // TokenBUSD = await ethers.getContractFactory("ZPad");
  // busd = await TokenBUSD.deploy();
  // await busd.deployed();

  TicketConsumer = await ethers.getContractFactory("TicketConsumer");
  ticketConsumer = await TicketConsumer.deploy();
  await ticketConsumer.deployed();

  Factory = await ethers.getContractFactory("Factory");
  factory = await Factory.deploy(ticketConsumer.address);
  await factory.deployed();

  Staking = await ethers.getContractFactory("Staking");
  staking = await Staking.deploy(zpad.address,rewardToken.address,10000000);
  await staking.deployed();

  CrowdSale = await ethers.getContractFactory("CrowdSale");
  
  
  let tx = await rewardToken.setMinter(staking.address)
  await tx.wait()

  tx = await ticketConsumer.setFactory(factory.address)
  await tx.wait()

  tx = await ticketConsumer.setStaking(staking.address)
  await tx.wait()

  tx = await staking.setTicketConsumer(ticketConsumer.address)
  await tx.wait()

  
  console.log("ZPad deployed to:", zpad.address);
  console.log("staking deployed to:", staking.address);
  console.log("RewardToken deployed to:", rewardToken.address);
  console.log("TokenForSale deployed to:", tokenForSale.address);
  console.log("TicketConsumer deployed to:", ticketConsumer.address);
  console.log("Factory deployed to:", factory.address);
  
  

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(zpad, staking,rewardToken ,tokenForSale,ticketConsumer,factory);
}
//,nftPreSale,nftPubSale,nft

function saveFrontendFiles(zpad, staking ,rewardToken ,tokenForSale,ticketConsumer,factory) {
  const fs = require("fs");
  const contractsDir = "../frontend/src/contract";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  let config = `
 export const zpad_addr = "${zpad.address}"
 export const staking_addr = "${staking.address}"
 export const rewardToken_addr = "${rewardToken.address}"
 export const tokenForSale_addr = "${tokenForSale.address}"
 export const ticketConsumer_addr = "${ticketConsumer.address}"
 export const factory_addr = "${factory.address}"
 export const busd_addr = "0xE2aD269bD111FF893BE307A4c6DAA01662aCb352"
`

  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );
  //   config =`[
  //     "constructor()",
  //     "event Approval(address indexed,address indexed,uint256)",
  //     "event Transfer(address indexed,address indexed,uint256)",
  //     "function allowance(address,address) view returns (uint256)",
  //     "function approve(address,uint256) returns (bool)",
  //     "function balanceOf(address) view returns (uint256)",
  //     "function decimals() view returns (uint8)",
  //     "function decreaseAllowance(address,uint256) returns (bool)",
  //     "function increaseAllowance(address,uint256) returns (bool)",
  //     "function name() view returns (string)",
  //     "function symbol() view returns (string)",
  //     "function totalSupply() view returns (uint256)",
  //     "function transfer(address,uint256) returns (bool)",
  //     "function transferFrom(address,address,uint256) returns (bool)"
  //   ]`
  //  data = JSON.stringify(config)
  // fs.writeFileSync(
  //   contractsDir + '/BUSD.json', JSON.parse(data)

  // );

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby