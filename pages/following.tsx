import FeedList from '@/components/feed/feedList'
import Page from '@/components/main/Page'
import {
	Button,
	Text,
	TextInput,
	Loader,
	Modal,
	Group,
	SegmentedControl,
} from '@mantine/core'
import { FeedFilter } from '@/utils/constants/constants'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import {
	useChain,
	useMoralis,
	useMoralisQuery,
	useWeb3ExecuteFunction,
} from 'react-moralis'
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import config from '@/utils/config.json'
import { Greet, GreetUser } from '@/typechain-types'

const Following = () => {
	const router = useRouter()
	const [userName, setUserName] = useState<string>('')
	const [registering, setRegistering] = useState<boolean>(false)
	const [registerError, setRegisterError] = useState<boolean>(false)
	const [registerErrorMsg, setRegisterErrorMsg] = useState<string>('')
	const [opened, setOpened] = useState<boolean>(false)
	const { Moralis, web3, user } = useMoralis()
	const { web3Library, executeFunction } = Moralis
	const { account } = useChain()

	let userContract: GreetUser

	const handleRegister = async () => {
		setRegistering(true)
		function containsWhitespace(str: string) {
			return /\s/.test(str)
		}
		setRegistering(true)
		if (containsWhitespace(userName)) {
			setRegisterError(true)
			setRegisterErrorMsg("User name can't contain whitespace")
			return
		}else if(userName===""){
			setRegisterError(true)
			setRegisterErrorMsg("User name can't be empty")
			return
		}
		try {
			userContract = new web3Library.Contract(
				config.contractAddress.User,
				GreetUserAbi.abi,
				web3?.getSigner()
			) as GreetUser
			let gasPrice = await web3?.getGasPrice()
			let estimateGas = web3Library.utils.hexlify(
				gasPrice?.mul(120).div(100) || 0
			)
			let tx = await userContract.registerNewUser(userName, {
				gasLimit: web3Library.utils.hexlify(500000),
				gasPrice: estimateGas,
			})
			await tx.wait()
			setRegisterError(false)
			setRegistering(false)
		} catch (error) {
			setRegistering(false)
			setRegisterError(true)
			setRegisterErrorMsg(error.message)
			if (error.data.message) {
				setRegisterErrorMsg(error.data.message)
			}
		}
	}

	useEffect(() => {
		let userContract = new web3Library.Contract(
			config.contractAddress.User,
			GreetUserAbi.abi,
			web3?.getSigner()
		) as GreetUser
		userContract
			.isRegistered(account || '')
			.then((res) => {
				if (res === false) {
					setOpened(true)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	const images: string[] = [
		'https://picsum.photos/id/1018/1000/600/',
		'https://picsum.photos/id/1015/1000/600/',
		'https://picsum.photos/id/1019/1000/600/',
	]

	let feeds: Feed[] = [
		{
			userName: 'YC2',
			id: '1',
			timestamp: 'timestamp',
			textContent: 'test',
			images: images,
		},
		{
			userName: 'YC2',
			id: '2',
			timestamp: 'timestamp',
			textContent: 'test',
			images: images,
		},
		{
			userName: 'YC2',
			id: '3',
			timestamp: 'timestamp',
			textContent: 'test',
			images: images,
		},
	]

	return (
		<Page title='test' homePage={true}>
			<Modal
				opened={opened}
				title='Register'
				centered
				onClose={() => router.push('/')}
			>
				<>
					<Text size='sm'>Register with the user name to proceed</Text>
					<TextInput
						placeholder='User name'
						label='User name'
						required
						disabled={registering}
						error={registerError && registerErrorMsg}
						onChange={(e) => setUserName(e.target.value)}
						onFocus={() => setRegisterErrorMsg('')}
					/>
					{registering && <Loader />}
					<Group position='right'>
						<Button mt='sm' onClick={handleRegister} loading={registering}>
							Register
						</Button>
					</Group>
				</>
			</Modal>

			{/* <FeedList
				feeds={feeds}
				filter={FeedFilter.Trending}
				isFollowing={false}
			/> */}
		</Page>
	)
}

export default Following
