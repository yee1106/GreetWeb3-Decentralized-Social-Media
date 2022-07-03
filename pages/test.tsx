import { useQuery, gql } from '@apollo/client'
import { Connection, Query, UserIdentity } from '@/graphql/cyberConnect'
import { useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import config from '@/utils/config.json'
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import { Text } from '@/typechain-types'
import { useMetaTransaction } from '@/hooks/useMetaTransaction'
import { Group, Button, TextInput, Box, Center } from '@mantine/core'
import TextAbi from '../artifacts/contracts/Text.sol/Text.json'
import { Text2 } from '@/typechain-types'
import TextAbi2 from '../artifacts/contracts/Text2.sol/Text2.json'
import TextTransition, { presets } from "react-text-transition";

const Test = () => {
	const {
		web3,
		Moralis,
		authenticate,
		logout,
		isAuthenticated,
		user,
		isWeb3Enabled,
	} = useMoralis()
	const chain = useChain()
	const [text, setText] = useState<string>('')
	const [number,setNumber] = useState<number>(0)

	//let [contract, setContract] = useState<GreetUser|undefined>(undefined)
	let {
		contract,
		ready,
		error,
		sendMetaTransaction,
		waitTransaction,
		readOnlyContract,
	} = useMetaTransaction<Text>(
		'0x491897804c42082E44D272565Bb1613F20faeA45',
		TextAbi.abi
	)

	let { data, loading } = useQuery<Query>(gql`
		query IdentityQuery1 {
			identity(
				address: "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
				network: ETH
			) {
				domain
			}
		}
	`)

	// let { contract, ready, error, sendMetaTransaction,sendMetaTransactionEIP712 } =
	// 	useMetaTransaction<Text2>(
	// 		'0x6a971295D86761196B9f6D007cbBD0aDE46330C0',
	// 		TextAbi2.abi
	// 	)

	useEffect(() => {
		let getCurrentText = async () => {
			// let textContract = new Moralis.web3Library.Contract(
			// 	'0x491897804c42082E44D272565Bb1613F20faeA45',
			// 	TextAbi.abi
			// ) as Text
			// textContract.text().then((res) => {
			// 	alert(res)
			// })
			let t = await readOnlyContract?.text()
			//let t = await viewOnlyContract?.text()
			// t && setText(t as string)
			// let t = await contract?.text()
			t && setText(t as string)
		}
		
		getCurrentText()
	}, [readOnlyContract])

	

	let handleTransaction = async () => {
		if (ready && contract) {
			let senderAddress = user?.get('ethAddress')
			alert(senderAddress)
			let functionData = await contract.populateTransaction.setText(text)
			let res = await sendMetaTransaction(functionData, senderAddress)
			alert(res)
			await waitTransaction(res)
			console.log(res)
			alert('done')
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
				{/* {data && !loading && <p>{data.identity.domain}</p>} */}
				
					
				<TextTransition text={number} noOverflow/>
				<Group>
					<Button onClick={()=>setNumber(n=>n+1)}>Increment</Button>
					<Button onClick={()=>setNumber(n=>n-1)}>Decrement</Button>
				</Group>
			</Group>
		</Center>
	)
}
export default Test
