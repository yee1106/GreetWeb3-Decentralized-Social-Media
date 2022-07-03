import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { ethers, run } from 'hardhat'
import hre from 'hardhat'

import type { GreetUser } from '../typechain-types/GreetUser'
import { abi } from '../artifacts/contracts/GreetUser.sol/GreetUser.json'
import type { Sign } from '../typechain-types/Sign'

chai.use(solidity)
chai.use(chaiAsPromised)
const { expect } = chai

describe('SigTest', () => {
	let sigTest: Sign

	beforeEach(async () => {
		// Get eth signers
		const signers = await ethers.getSigners()
		// prepare the contract for deployment
		const counterFactory = await ethers.getContractFactory('Sign', signers[0])

		// DEPLOY
		sigTest = (await counterFactory.deploy()) as Sign
		await sigTest.deployed()
	})

	describe('test', async () => {
		// it("test basic signing from client", async () => {
		//     const [adminWallet, userWallet] = await ethers.getSigners();

		//     // STEP 1:
		//     // building hash has to come from system address
		//     // 32 bytes of data
		//     let messageHash = ethers.utils.solidityKeccak256(
		//         ["string"],
		//         ["test"]
		//     );

		//     console.log("msgHash: " + messageHash)

		//     // STEP 2: 32 bytes of data in Uint8Array
		//     let messageHashBinary = ethers.utils.arrayify(messageHash);

		//     // STEP 3: To sign the 32 bytes of data, make sure you pass in the data
		//     let signature = await adminWallet.signMessage(messageHashBinary);

		//     console.log("Signature: "+ signature)

		//     // STEP 4: Fire off the transaction with the adminWallet signed data
		//     await sigTest.recoverWithSig3(signature)
		//     expect(await sigTest._address()).to.eq(adminWallet.address);

		// });
		it('test sign', async () => {
			const [account] = await ethers.getSigners()
			console.log('address: ' + account.address)
			const msg = 'test'
			const hash = ethers.utils.solidityKeccak256(['string'], ['test'])
			console.log('raw hash: ' + hash)
			console.log('prefixed hash: ' + ethers.utils.hashMessage('test'))
			let signature = await account.signMessage('test')
			console.log(signature)
			let extractedSig = ethers.utils.splitSignature(signature)
			await sigTest.recoverWithSig(
				extractedSig.r,
				extractedSig.s,
				extractedSig.v
			)
			expect(await sigTest._address()).to.eq(account.address)
		})
		it('test sign2', async () => {
			const [account] = await ethers.getSigners()
			console.log('address: ' + account.address)
			const msg = 'test'
			const hash = ethers.utils.solidityKeccak256(['string'], ['test'])
			console.log('raw hash: ' + hash)
			console.log('prefixed hash: ' + ethers.utils.hashMessage('test'))
			let signature = await account.signMessage('test')
			console.log(signature)
			let extractedSig = ethers.utils.splitSignature(signature)
			await sigTest.recoverWithSig2(
				ethers.utils.hashMessage('test'),
				extractedSig.r,
				extractedSig.s,
				extractedSig.v
			)
			expect(await sigTest._address()).to.eq(account.address)
		})
		it('test sign3', async () => {
			const [account] = await ethers.getSigners()
			console.log('address: ' + account.address)
			const msg = 'test'
			const hash = ethers.utils.solidityKeccak256(['string'], ['test'])
			console.log('raw hash: ' + hash)
			console.log('prefixed hash: ' + ethers.utils.hashMessage('test'))
			let signature = await account.signMessage('test')
			console.log(signature)
			let extractedSig = ethers.utils.splitSignature(signature)
			await sigTest.recoverWithSig3(signature)
			expect(await sigTest._address()).to.eq(account.address)
		})
    it('test sign4', async () => {
			const [account] = await ethers.getSigners()
			console.log('address: ' + account.address)
			const msg = 'test'
			const hash = ethers.utils.solidityKeccak256(['string'], ['test'])
			console.log('raw hash: ' + hash)
			console.log('prefixed hash: ' + ethers.utils.hashMessage('test'))
			let signature = await account.signMessage('test')
			console.log(signature)
			let extractedSig = ethers.utils.splitSignature(signature)
			await sigTest.recoverWithSig4(ethers.utils.hashMessage('test'),signature)
			expect(await sigTest._address()).to.eq(account.address)
		})
	})
})
