require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require('dotenv').config({path: __dirname+'/.env'})


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

console.log(process.env.ALCHEMY_API)
console.log(process.env.privateKey)

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// const ALCHEMY_API_KEY = `GKcZh-E7o6PB3gEz0M9fUHPwG4_xHbbj`
// const privateKey = `7ad2941b69a0d0429d576eaac92d18e6f4c17c2dc2673c221585b2b96e5cbdb3`

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API}`,
      accounts: [`0x${process.env.privateKey}`],
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 21000000000,
      accounts: [`0x${privateKey}`],
    },
    binance: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${privateKey}`],
    }
  },
  
  abiExporter: {
    path: '../frontend/src/contract',
    runOnCompile: true,
    clear: true,
    only: [':ZPad$', ':Staking$', ':Factory$', ':RewardToken$', ':CrowdSale$', ':TicketConsumer$'],
    flat: true,
    spacing: 2,
    pretty: true,
  },
};
