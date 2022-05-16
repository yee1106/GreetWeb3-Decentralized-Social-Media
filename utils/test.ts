import axios from 'axios'
import {ethers} from "ethers"
import { Text } from '@/typechain-types'
import TextAbi from '../artifacts/contracts/Text.sol/Text.json'

let main = () => {
	axios
		.post(
			'https://api.stg.cybertino.io/connect/',
			JSON.stringify({
				query: `
				query ProofQuery($from: String!, $to: String!) {
					connections(fromAddr: $from, toAddrList: [$to], network: ETH) {
						proof
						followStatus {
							isFollowed
							isFollowing
						}
					}
				}
				`,
				variables: {
					from: '0x5AE95E3204CC823ca94Ee9C87efa278A042d178b',
					to: '0x48952e9B47DFd212f94e436175FEDDD311048Ded',
				},
			}),
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then((res) => res.data)
		.then((result) => console.dir(result.data.connections[0],{depth:null}))
}
let web3test = async ()=>{
	let provider = new ethers.providers.JsonRpcProvider(
		'https://speedy-nodes-nyc.moralis.io/403a6660403ac5963d746231/polygon/mumbai'
	)
	let wallet = new ethers.Wallet("69529392c44259879d451ef9ab7c39f34292f7798b336005d8574dce48535249",provider)
	
	// let gasPrice = await provider.getGasPrice()
	// console.log(gasPrice)
	let contract = new ethers.Contract("0x491897804c42082E44D272565Bb1613F20faeA45",TextAbi.abi, wallet) as Text
	let contractInterface = new ethers.utils.Interface(TextAbi.abi);
	let functionSignature = contractInterface.encodeFunctionData('setText',["text"]);
	let data = (await contract.populateTransaction.setText("text")).data
	console.log(functionSignature)
	console.log(data)
	
}
web3test()
//main()
