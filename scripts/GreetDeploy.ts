import { run, ethers } from 'hardhat'
import { abi } from '../artifacts/contracts/GreetUser.sol/GreetUser.json'
import fs from 'fs'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import type { Greet } from '../typechain-types/Greet'
import type { GreetUser } from '../typechain-types/GreetUser'
import config from "@/utils/config.json"

async function main() {
	let trustedForwarderAddress = '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b'
	//let userManager: GreetUser
	let postManager: Greet
	let signer: SignerWithAddress[]
	//let userContractAddress: string
	let greetContractAddress: string

	signer = await ethers.getSigners()

  let data = JSON.parse(fs.readFileSync('./utils/config.json').toString());
  console.log(data)

	let userContractAddress:string = data.contractAddress.User

	const greetContract = await ethers.getContractFactory('Greet', signer[0])
	postManager = await greetContract.deploy(
		userContractAddress,
		trustedForwarderAddress
	)
	await postManager.deployed()
	greetContractAddress = postManager.address

	console.log('Greet contract address: ' + greetContractAddress)
	

	let newConfig = {
		contractAddress: {
			User: userContractAddress.toLowerCase(),
			Greet: greetContractAddress.toLowerCase(),
		},
	}
	fs.writeFileSync('./utils/config.json', JSON.stringify(newConfig))
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
