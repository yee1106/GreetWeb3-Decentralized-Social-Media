import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { ethers, run } from 'hardhat'
import hre from 'hardhat'

import type { Greet } from '../typechain-types/Greet'
import post from '../artifacts/contracts/Greet.sol/Greet.json'

import type { GreetUser } from '../typechain-types/GreetUser'
import User from '../artifacts/contracts/GreetUser.sol/GreetUser.json'
import GreetPost from '../artifacts/contracts/Greet.sol/Greet.json'

chai.use(solidity)
chai.use(chaiAsPromised)
const { expect } = chai

describe('Post', () => {
	let userManager: GreetUser
	let postManager: Greet
	let signer: SignerWithAddress[]
	let userContractAddress: string
	let greetContractAddress: string
	let testAddress: string = '0x0000000000000000000000000000000000000000'
	before(async () => {
		signer = await ethers.getSigners()
		
		const userContract = await ethers.getContractFactory('GreetUser', signer[0])
		userManager = await userContract.deploy(testAddress)
		await userManager.deployed()
		userContractAddress = userManager.address
		
		const greetContract = await ethers.getContractFactory('Greet', signer[0])
		postManager = await greetContract.deploy(userContractAddress, testAddress)
		await postManager.deployed()
		greetContractAddress = postManager.address

		console.log(greetContractAddress)
		console.log(
			await userManager.getUserPublicDetailsByAddress(signer[0].address)
		)


	})
	it("Create a new post",async()=>{
		let account = signer[0]
		let supply = 10 //Greet supply
		await postManager.mint(supply,"testURI");
                             
		expect(await postManager.balanceOf(account.address,1)).to.eq(10)
		expect(await postManager.uri(1)).to.eq("testURI")
	})	
	it("Should fail when a unregistered address mint a Greet",async ()=>{
		let postManager1 = new ethers.Contract(greetContractAddress,GreetPost.abi,signer[1]) as Greet
		await expect(postManager1.mint(10,"testURI2")).to.be.revertedWith('Only registered user can call this function')
	}) 
	it("Set new URI for a Greet",async()=>{
		await postManager.setTokenUri(1,"testURI3")
		expect(await postManager.uri(1)).to.eq("testURI3")
	})
	it("Should fail when non-greet owner change the URI",async()=>{
		let postManager1 = new ethers.Contract(greetContractAddress,GreetPost.abi,signer[1]) as Greet
		await expect(postManager1.setTokenUri(1,"testURI4")).to.be.revertedWith('Only creator or admin can edit the Greet')
	})
})
