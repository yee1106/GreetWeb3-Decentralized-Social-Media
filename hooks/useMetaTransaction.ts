import {
	BaseContract,
	BigNumber,
	Contract,
	ContractReceipt,
	ethers,
	PopulatedTransaction,
} from 'ethers'
import { Biconomy } from '@biconomy/mexa'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import config from '@/utils/config.json'
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import { GreetUser } from '@/typechain-types'

export const useMetaTransaction = <T extends BaseContract>(
	address: string,
	contractInterface: ethers.ContractInterface
) => {
	const { web3, Moralis } = useMoralis()
	let [contract, setContract] = useState<T | undefined>(undefined)
	let [ready, setReady] = useState<boolean>(false)
	let [error, setError] = useState<boolean>(false)
	let [biconomy, setBiconomy] = useState<any>(null)
	// Pass connected wallet provider under walletProvider field

	useEffect(() => {
		let init = async () => {
			let biconomy = new Biconomy(
				new Moralis.web3Library.providers.JsonRpcProvider(
					 'https://speedy-nodes-nyc.moralis.io/403a6660403ac5963d746231/polygon/mumbai'
					//process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_NODE as string
				),
				{
					walletProvider: window.ethereum,
					apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY as string,
					//apiKey: 'XSdN0Myhr.11626e87-964f-4e81-8346-b3553ece6801',
					debug: true,
				}
			)
			setBiconomy(biconomy)

			
			let userAddress = await web3?.getSigner().getAddress()
			biconomy
				.onEvent(biconomy.READY, () => {
					let Contract = new Moralis.web3Library.Contract(
						address,
						contractInterface,
						biconomy.getSignerByAddress(userAddress)
					) as T
					setContract(Contract)
					setReady(true)
				})
				.onEvent(biconomy.ERROR, (error, message) => {
					// Handle error while initializing mexa
					console.log(message)
					console.log(error)
					setError(true)
				})
		}
		;(window.ethereum || typeof window !== undefined) && init()
		return () => {
			setContract(undefined)
			setReady(false)
			setError(false)
		}
	}, [])

	let sendMetaTransaction = async (
		functionData: PopulatedTransaction,
		senderAddress: string
	): Promise<string> => {
		return new Promise(async (resolve, reject) => {
			if (biconomy !== null && contract) {
				try {
					let provider =
						biconomy.getEthersProvider() as ethers.providers.Web3Provider
						
					let gasLimit = await provider.estimateGas({
						to: address,
						from: senderAddress,
						data: functionData.data,
					})
					let gasPrice = await web3?.getGasPrice()
					console.log('Gas limit : ', gasLimit)
					let txParams = {
						data: functionData.data,
						to: address,
						from: senderAddress,
						//gasLimit: gasLimit.mul(5).toHexString(),
						gasLimit: Moralis.web3Library.utils.hexlify(500000),
						gasPrice: gasPrice?.toHexString(),
						signatureType: 'EIP712_SIGN',
					}
					let tx
					try {
						tx = await provider.send('eth_sendTransaction', [txParams])
					} catch (err) {
						console.log('handle errors like signature denied here')
						console.log(err)
					}

					console.log('Transaction hash : ', tx)

					try {
						//event emitter methods
						provider.once(tx, (transaction) => {
							// Emitted when the transaction has been mined
							resolve(transaction.transactionHash as string)
							//console.log(transaction.hash)
							//console.log(transaction)
						})
					} catch (error) {
						console.log(error)
					}
				} catch (error) {
					console.log(error)
					reject(error)
				}
			}
		})
	}

	let sendMetaTransactionEIP712 = async (
		functionData: PopulatedTransaction,
		senderAddress: string,
		nonce:string
	): Promise<string> => {
		// Initialize Constants
		const domainType = [
			{ name: 'name', type: 'string' },
			{ name: 'version', type: 'string' },
			{ name: 'verifyingContract', type: 'address' },
			{ name: 'salt', type: 'bytes32' },
		]
		const metaTransactionType = [
			{ name: 'nonce', type: 'uint256' },
			{ name: 'from', type: 'address' },
			{ name: 'functionSignature', type: 'bytes' },
		]
		// replace the chainId 42 if network is not kovan
		let domainData = {
			name: 'TextContract',
			version: '1',
			verifyingContract: address,
			// converts Number to bytes32. Use your own chainId instead of 42 for other networks
			salt: ethers.utils.hexZeroPad(
				ethers.BigNumber.from(80001).toHexString(),
				32
			),
		}

		return new Promise(async (resolve, reject) => {
			if (biconomy !== null && contract) {
				try{
					let message:any = {}
				message.nonce = parseInt(nonce)
				message.from = senderAddress
				message.functionSignature = functionData.data

				const dataToSign = JSON.stringify({
					types: {
						EIP712Domain: domainType,
						MetaTransaction: metaTransactionType,
					},
					domain: domainData,
					primaryType: 'MetaTransaction',
					message: message,
				})
				console.log(dataToSign)

				let walletProvider = new ethers.providers.Web3Provider(window.ethereum);
				let networkProvider = new ethers.providers.Web3Provider(biconomy);
				/*Its important to use eth_signTypedData_v3 and not v4 to get EIP712 signature 
because we have used salt in domain data instead of chainId*/
				// Get the EIP-712 Signature and send the transaction
				let provider =
						biconomy.getEthersProvider() as ethers.providers.Web3Provider
				let signature = await walletProvider.send('eth_signTypedData_v3', [
					senderAddress,
					dataToSign,
				])
				alert(signature)
				let { r, s, v } = getSignatureParameters(signature)
				let gasPrice = await web3?.getGasPrice()
				//@ts-expect-error
				let tx = await contract.executeMetaTransaction(
					senderAddress,
					functionData.data,
					r,
					s,
					v,
					{
						gasLimit: Moralis.web3Library.utils.hexlify(500000),
						gasPrice: gasPrice?.toHexString(),
					}
				)

				let res = await tx.wait()
				console.log('Transaction hash : ', res.hash)
				resolve(tx.hash)
				}catch(error){
					reject(error)
				}
			}
		})
	}

	return {
		contract,
		ready,
		error,
		sendMetaTransaction,
		sendMetaTransactionEIP712
	}
}

const getSignatureParameters = (signature: string) => {
	if (!ethers.utils.isHexString(signature)) {
		throw new Error(
			'Given value "'.concat(signature, '" is not a valid hex string.')
		)
	}
	var r = signature.slice(0, 66)
	var s = '0x'.concat(signature.slice(66, 130))
	var v: any = '0x'.concat(signature.slice(130, 132))
	v = ethers.BigNumber.from(v).toNumber()
	if (![27, 28].includes(v)) v += 27
	return {
		r: r,
		s: s,
		v: v,
	}
}

export default useMetaTransaction
