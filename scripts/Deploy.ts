import { run, ethers } from 'hardhat'
import { abi } from '../artifacts/contracts/GreetUser.sol/GreetUser.json'
import fs from 'fs'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import type { Greet } from '../typechain-types/Greet'
import type { GreetUser } from '../typechain-types/GreetUser'

async function main() {
	let trustedForwarderAddress = '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b'
	let userManager: GreetUser
	let postManager: Greet
	let signer: SignerWithAddress[]
	let userContractAddress: string
	let greetContractAddress: string

	signer = await ethers.getSigners()

	const userContract = await ethers.getContractFactory('GreetUser', signer[0])
	userManager = await userContract.deploy(trustedForwarderAddress)
	await userManager.deployed()
	userContractAddress = userManager.address

	const greetContract = await ethers.getContractFactory('Greet', signer[0])
	postManager = await greetContract.deploy(
		userContractAddress,
		trustedForwarderAddress
	)
	await postManager.deployed()
	greetContractAddress = postManager.address

	console.log('User contract address: ' + userContractAddress)
	console.log('Greet contract address: ' + greetContractAddress)
	console.log(
		'First User: ' +
			(await userManager.getUserPublicDetailsByAddress(signer[0].address))
	)

	let config = {
		contractAddress: {
			User: userContractAddress.toLowerCase(),
			Greet: greetContractAddress.toLowerCase(),
		},
	}
	fs.writeFileSync('./utils/config.json', JSON.stringify(config))
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
