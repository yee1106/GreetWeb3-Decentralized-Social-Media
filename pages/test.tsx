import { useQuery, gql } from '@apollo/client'
import { UserIdentity } from '@/graphql/cyberConnect'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import config from '@/utils/config.json'
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import { Text } from '@/typechain-types'
import { useMetaTransaction } from '@/hooks/useMetaTransaction'
import { Group, Button, TextInput, Box, Center } from '@mantine/core'
import TextAbi from '../artifacts/contracts/Text.sol/Text.json'
import { Text2 } from '@/typechain-types'
import TextAbi2 from '../artifacts/contracts/Text2.sol/Text2.json'

const Test = () => {
	const { web3, Moralis, authenticate, logout, isAuthenticated, user } =
		useMoralis()
	const [text, setText] = useState<string>('')
	//let [contract, setContract] = useState<GreetUser|undefined>(undefined)
	let { contract, ready, error, sendMetaTransaction } =
		useMetaTransaction<Text>(
			'0x491897804c42082E44D272565Bb1613F20faeA45',
			TextAbi.abi
		)
	// let { contract, ready, error, sendMetaTransaction,sendMetaTransactionEIP712 } =
	// 	useMetaTransaction<Text2>(
	// 		'0x6a971295D86761196B9f6D007cbBD0aDE46330C0',
	// 		TextAbi2.abi
	// 	)

	useEffect(() => {
		let getCurrentText = async () => {
			let t = await contract?.text()
			t && setText(t as string)
		}
		getCurrentText()
	}, [contract])

	let handleTransaction = async () => {
		if (ready && contract) {
			let gasPrice = await web3?.getGasPrice()
			let senderAddress = user?.get('ethAddress')
			alert(senderAddress)
			let functionData = await contract.populateTransaction.setText(text)
			//let nonce = await contract.getNonce(senderAddress)
		
			//let tx = await contract.setText("test",{})
			
			
			// let contractInterface = new Moralis.web3Library.utils.Interface(TextAbi.abi);
			// let functionSignature = contractInterface.encodeFunctionData('setText',[text]);
			let signer = web3?.getSigner()
			

			
			let res = await sendMetaTransaction(functionData, senderAddress)
			//let res = await sendMetaTransactionEIP712(functionData, senderAddress, nonce.toNumber().toString())
			console.log(res)
			alert(res)
		}
	}
	return (
		<Center
			style={{
				height: '100vh',
				backgroundColor: 'black',
			}}
		>
			<Group
				p='md'
				direction='column'
				position='center'
				style={{
					backgroundColor: 'grey',
					borderRadius: '5px',
					width: '25%',
				}}
			>
				<Group>
					<TextInput
						placeholder='text'
						label={`Current text: ${text}`}
						onChange={(e) => setText(e.target.value)}
					/>
				</Group>
				<Group>
					{!isAuthenticated ? (
						<Button onClick={() => authenticate()}>Connect</Button>
					) : (
						<Button onClick={() => logout()}>Disconnect</Button>
					)}
					<Button onClick={handleTransaction}>Set text</Button>
				</Group>
			</Group>
		</Center>
	)
}
export default Test
