import { Contract, ethers, PopulatedTransaction } from 'ethers'
import { Biconomy } from '@biconomy/mexa'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export const useMetaTransaction = <T extends Contract>(
	address: string,
	contractInterface: ethers.ContractInterface
) => {
	const { web3, Moralis } = useMoralis()
	let [contract, setContract] = useState<T | undefined>(undefined)
	let [readOnlyContract, setReadOnlyContract] = useState<T | undefined>(
		undefined
	)
	let [ready, setReady] = useState<boolean>(false)
	let [error, setError] = useState<boolean>(false)
	let [biconomy, setBiconomy] = useState<Biconomy | null>(null)

	useEffect(() => {
		let init = async () => {
			let userAddress = await web3?.getSigner().getAddress()
			let networkProvider = new Moralis.web3Library.providers.JsonRpcProvider(
				process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_NODE as string
			)
			let viewContract = <T>(
				new ethers.Contract(address, contractInterface, networkProvider)
			)
			setReadOnlyContract(viewContract)
			let biconomy = new Biconomy(networkProvider, {
				walletProvider: window.ethereum,
				apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY as string,
				//debug: true,
			})
			setBiconomy(biconomy)
			biconomy
				.onEvent(biconomy.READY, () => {
					let Contract = <T>(
						new ethers.Contract(
							address,
							contractInterface,
							biconomy.getSignerByAddress(userAddress)
						)
					)
					setContract(Contract)
					setReady(true)
				})
				.onEvent(biconomy.ERROR, () => {
					setReady(false)
					setError(true)
				})
		}
		;(window.ethereum || typeof window !== undefined) && init()
		return () => {
			setContract(undefined)
			setReadOnlyContract(undefined)
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
					let gasPrice = await web3?.getGasPrice()
					let txParams = {
						data: functionData.data,
						to: address,
						from: senderAddress,
						gasLimit: Moralis.web3Library.utils.hexlify(500000),
						gasPrice: gasPrice?.toHexString(),
						signatureType: 'EIP712_SIGN',
					}
					try {
						let tx = (await provider.send('eth_sendTransaction', [
							txParams,
						])) as string
						console.log('Transaction hash : ', tx)
						resolve(tx)
					} catch (err) {
						console.log(err)
					}
				} catch (error) {
					console.log(error)
					reject(error)
				}
			}
		})
	}

	let waitTransaction = async (tx: string): Promise<string> => {
		return new Promise<string>(async (resolve, reject) => {
			try {
				if (web3) {
					let provider = web3
					let response = await provider.waitForTransaction(tx, 1)
					resolve(response.transactionHash)
				} else {
					resolve('')
				}
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		contract,
		readOnlyContract,
		ready,
		error,
		sendMetaTransaction,
		waitTransaction,
	}
}

export default useMetaTransaction
