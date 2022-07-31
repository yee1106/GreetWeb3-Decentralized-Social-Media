import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import useMetaTransaction from '@/hooks/useMetaTransaction'
import { Text as TextContract } from '@/typechain-types'
import TextAbi from '@/artifacts/contracts/Text.sol/Text.json'
import {
	Box,
	Button,
	Center,
	createStyles,
	Group,
	Loader,
	Stack,
	Text,
	TextInput,
} from '@mantine/core'
import { useChain } from 'react-moralis'

const Test = () => {
	const { classes } = useStyles()
	let [text, setText] = useState('')
	let [currentText, setCurrentText] = useState('')
	let [loading, setLoading] = useState(false)
	let { account } = useChain()
	let {
		sendMetaTransaction,
		waitTransaction,
		readOnlyContract,
		contract,
		ready,
		error,
	} = useMetaTransaction<TextContract>(
		'0x491897804c42082E44D272565Bb1613F20faeA45',
		TextAbi.abi
	)

	let getText = async () => {
		let t = await readOnlyContract?.text()
		setCurrentText(t || '')
	}

	useEffect(() => {
		if (ready) {
			getText()
		}
	}, [ready])

	useEffect(() => {
		!ready ? setLoading(true) : setLoading(false)
	}, [ready])

	let handleSend = async () => {
		let request = await contract?.populateTransaction.setText(text)!
		let tx = await sendMetaTransaction(request, account!)
		await waitTransaction(tx)
		alert('set text done')
		getText()
	}

	return (
		<Box className={classes.container}>
			<Group className={classes.center} position='center' py='md'>
				<Stack>
					<Text>Current: {loading ? (<Loader size={'xs'}/>) : currentText}</Text>
					<Text>Text: {text}</Text>
					<TextInput onChange={(e) => setText(e.target.value)} />
					<Button onClick={handleSend}>Set text</Button>
				</Stack>
			</Group>
		</Box>
	)
}

const useStyles = createStyles((theme) => {
	return {
		container: {
			//width:"100vw",
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
		},
		center: {
			width: '50%',
			backgroundColor: theme.colors.gray[7],
			borderRadius: '10px',
		},
	}
})

export default Test
