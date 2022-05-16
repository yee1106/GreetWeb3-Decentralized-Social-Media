import { task, HardhatUserConfig } from 'hardhat/config'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import "hardhat-interface-generator";
import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-etherscan";
import { config } from 'dotenv'
config()

// task('accounts', 'Prints the list of accounts', async (args, hre) => {
// 	const accounts = await hre.ethers.getSigners()

// 	for (const account of accounts) {
// 		console.log(account.address)
// 	}
// 	console.log(process.env.ACCOUNT)
// })

const hardhatConfig: HardhatUserConfig = {
	solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
		
		
  },
	
	paths: {
		artifacts: './artifacts',
	},
	defaultNetwork: 'hardhat',
	networks: {
		hardhat: {
			chainId: 1337,
		},
		localhost: {
			url: 'http://127.0.0.1:8545',
			accounts: [
				'f848283b043f41dcd40b8ea7c2f537ae5f1660e7f67a19944b4934f52cff7720',
				'2a14f0ae47028ec358f3a6f117f3970257fb7453cd87cc40b543f2523de48f07'
			],
			chainId: 1337,
		},
		localhost2:{
			url: 'http://127.0.0.1:8545',
			accounts: [
				'0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
				'0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
			],
			chainId: 1337,
		},
		mumbai: {
			url: 'https://speedy-nodes-nyc.moralis.io/403a6660403ac5963d746231/polygon/mumbai',
			accounts: [`${process.env.ACCOUNT}`],
			// gas: 21000000,
      // gasPrice: 8000000000
		},
	},
	etherscan:{
		apiKey:{
			polygonMumbai: process.env.ETHERSCAN_API_KEY
		}
	}
	
}

// module.exports = {
//   typechain: {
//     outDir: 'src/types',
//     target: 'ethers-v5',
//     alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
//     externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
//   },
// }

export default hardhatConfig
