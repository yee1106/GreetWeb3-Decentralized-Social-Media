import { run, ethers } from 'hardhat'
//import { abi } from '../artifacts/contracts/GreetUser.sol/GreetUser.json'
import fs from 'fs'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import type { Greet } from '../typechain-types/Greet'
import type { GreetUser } from '../typechain-types/GreetUser'
import type {Text2} from '../typechain-types/Text2'
import {abi} from "../artifacts/contracts/Text2.sol/Text2.json"

async function main() {
	let trustedForwarderAddress = '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b'
	let textManager:Text2
	let signer: SignerWithAddress[]
	

	signer = await ethers.getSigners()

	const textContract = await ethers.getContractFactory('Text2', signer[0])
	textManager = await textContract.deploy()
	await textManager.deployed()
  console.log("Deployed!")
	console.log("Contract address: " + textManager.address)
  console.log(abi)
	
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})