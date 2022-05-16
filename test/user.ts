import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { ethers, run } from 'hardhat'
import hre from 'hardhat'

import type { GreetUser } from '../typechain-types/GreetUser'
import { abi } from '../artifacts/contracts/GreetUser.sol/GreetUser.json'

chai.use(solidity)
chai.use(chaiAsPromised)
const { expect } = chai

describe('User', () => {
	describe('Register a new User (test with single account)', async () => {
		let userManager: GreetUser
		let signer: SignerWithAddress[]
		let contractAddress: string
		let testAddress: string = '0x0000000000000000000000000000000000000000'
		before(async () => {
			signer = await ethers.getSigners()
			const userContract = await ethers.getContractFactory(
				'GreetUser',
				signer[0]
			)
			userManager = await userContract.deploy(testAddress)
			await userManager.deployed()
			console.log(userManager.address)
			contractAddress = userManager.address
		})
		it('should fail when passing a empty user name', async () => {
			let userManager1 = new ethers.Contract(
				contractAddress,
				abi,
				signer[1]
			) as GreetUser
			await expect(userManager1.registerNewUser('')).to.be.revertedWith(
				'User name cannot be empty'
			)
		})
		it('should register a new user', async () => {
			let userManager1 = new ethers.Contract(
				contractAddress,
				abi,
				signer[1]
			) as GreetUser
			let address1 = signer[1].address
			let userName1 = 'YC1106'

			let tx = await userManager1.registerNewUser(userName1)
			await tx.wait()

			let userDetail = await userManager1.getUserPublicDetailsByAddress(
				address1
			)
			expect(userDetail._userName).to.eq(userName1)
		})

		it('should fail when register a user with same address', async () => {
			let userManager1 = new ethers.Contract(
				contractAddress,
				abi,
				signer[1]
			) as GreetUser
			let userName = 'YC11062'
			await expect(userManager1.registerNewUser(userName)).to.be.revertedWith(
				'This address already registered as a user'
			)
			let address1 = signer[1].address

			expect(
				(await userManager1.getUserPublicDetailsByAddress(address1))._userName
			).to.eq('YC1106')
		})
		it('should return true when passing a registered address', async () => {
			let address = signer[0].address
			expect(await userManager.isRegistered(address)).to.eq(true)
		})

		it('should fail when a new address registered with a taken name', async () => {
			let userName = 'YC1106'
			let userManager1 = new ethers.Contract(
				contractAddress,
				abi,
				signer[2]
			) as GreetUser
			await expect(userManager1.registerNewUser(userName)).to.be.revertedWith(
				'This user name is taken'
			)
		})
	})
})
