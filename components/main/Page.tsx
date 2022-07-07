import React, { CSSProperties, useEffect, useState } from 'react'
import {
	AppShell,
	Navbar,
	Header,
	Aside,
	Text,
	MediaQuery,
	useMantineTheme,
	Button,
	Box,
	Grid,
	Group,
	ActionIcon,
	UnstyledButton,
	Avatar,
	Modal,
	TextInput,
	Loader,
} from '@mantine/core'
import {
	hideNotification,
	showNotification,
	updateNotification,
} from '@mantine/notifications'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineSetting } from 'react-icons/ai'
import { Bell, Plus } from 'tabler-icons-react'
import { useViewportSize, useWindowScroll } from '@mantine/hooks'
import MainNavbar from '@/components/main/mainNavbar'
import MobileNavBar from './mobileNavBar'
import CyberConnect, { Env, Blockchain } from '@cyberlab/cyberconnect'
import { observer } from 'mobx-react-lite'
import userStore from '@/store/store'
import { useRouter } from 'next/router'
import { useChain, useMoralis, useMoralisQuery } from 'react-moralis'
import { Greet, GreetUser } from '@/typechain-types'
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import config from '@/utils/config.json'
import { BiErrorCircle } from 'react-icons/bi'
import { useCyberConnect } from '@/hooks/useCyberConnect'
import useMetaTransaction from '@/hooks/useMetaTransaction'
import Register from './register'

interface pageProps {
	title: string
	children: React.ReactNode
	homePage: boolean
}

const Page = observer(({ title, children, homePage }: pageProps) => {
	const theme = useMantineTheme()
	const { width } = useViewportSize()
	const router = useRouter()
	const {
		Moralis,
		isAuthenticated,
		authenticate,
		user,
		logout,
		web3,
		isWeb3Enabled,
		isWeb3EnableLoading,
		enableWeb3,
	} = useMoralis()
	const { web3Library } = Moralis
	const [userName, setUserName] = useState<string>('')
	const [registering, setRegistering] = useState<boolean>(false)
	const [registerError, setRegisterError] = useState<boolean>(false)
	const [registerErrorMsg, setRegisterErrorMsg] = useState<string>('')
	const [opened, setOpened] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string>("") 
	const { switchNetwork, chainId, chain, account } = useChain()
	const { data, error, isLoading, isFetching, fetch } = useMoralisQuery(
		'NewUser',
		(q) => q.equalTo('userAddress', user?.get('ethAddress')).limit(1),
		[user?.get('ethAddress')],
		{
			live: true,
		}
	)
	const users = useMoralisQuery(
		'_User',
		(q) => q.equalTo("ethAddress","0x48952e9b47dfd212f94e436175feddd311048ded").limit(10),
		[],
		{
			live: true,
		}
	)
	const gaslessTransaction = useMetaTransaction<GreetUser>('', GreetUserAbi.abi)

	let userContract: GreetUser

	let nonHomePagePath = [
		'/newGreet',
		'/profile/setting',
	]

	// async function getRelation() {
	// 	let obj = Moralis.Object.extend("Object")
	// 	let q = new Moralis.Query(obj)
	// 	let result = await q.first()
	// 	let relation = result?.relation("likes")
	// 	//const query = relation.query();
	// 	let r  = relation?.query().equalTo("uid","5")
	// 	console.log(r)
	// }

	const handleRegister = async () => {
		function containsWhitespace(str: string) {
			return /\s/.test(str)
		}
		setRegistering(true)
		if (containsWhitespace(userName)) {
			setRegisterError(true)
			setRegisterErrorMsg("User name can't contain whitespace")
			return
		} else if (userName === '') {
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

			//Estimate the gas price
			let gasPrice = await web3?.getGasPrice()
			let estimateGas = web3Library.utils.hexlify(
				gasPrice?.mul(120).div(100) || 0
			)

			//Register the user
			let tx = await userContract.registerNewUser(userName, {
				gasLimit: web3Library.utils.hexlify(500000),
				gasPrice: estimateGas,
			})
			await tx.wait()
			setRegisterError(false)
			setRegistering(false)
			router.push('/')
		} catch (error) {
			setRegistering(false)
			setRegisterError(true)
			setRegisterErrorMsg(error.message)
			if (error.data.message) {
				setRegisterErrorMsg(error.data.message)
			}
		}
	}
	const handleRegister2 = async () => {
		function containsWhitespace(str: string) {
			return /\s/.test(str)
		}
		setRegistering(true)
		if (containsWhitespace(userName)) {
			setRegisterError(true)
			setRegisterErrorMsg("User name can't contain whitespace")
			return
		} else if (userName === '') {
			setRegisterError(true)
			setRegisterErrorMsg("User name can't be empty")
			return
		}
		try {
			// userContract = new web3Library.Contract(
			// 	config.contractAddress.User,
			// 	GreetUserAbi.abi,
			// 	web3?.getSigner()
			// ) as GreetUser

			// //Estimate the gas price
			// let gasPrice = await web3?.getGasPrice()
			// let estimateGas = web3Library.utils.hexlify(
			// 	gasPrice?.mul(120).div(100) || 0
			// )

			//Register the user
			if (gaslessTransaction.ready && gaslessTransaction.contract && account) {
				let registerFunctionData =
					await gaslessTransaction.contract?.populateTransaction.registerNewUser(
						userName
					)
				
				let response =await gaslessTransaction.sendMetaTransaction(
					registerFunctionData,
					account
				)
				await gaslessTransaction.waitTransaction(response)
				let res = await web3?.waitForTransaction(response,1)
				setRegisterError(false)
				setRegistering(false)
				router.push('/')
			}
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
		//alert(chainId)
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
			enableWeb3()
		}
		if (isWeb3Enabled && chainId != Moralis.Chains.POLYGON_MUMBAI && chainId != '0x539') {
			hideNotification('switch')
			showNotification({
				id: 'switch',
				title: 'Error',
				message: 'Please switch the network to Mumbai',
				autoClose: 2500,
				disallowClose: true,
				color: 'red',
				icon: <BiErrorCircle size='100%' />,
			})
			switchNetwork(Moralis.Chains.POLYGON_MUMBAI)
		}
		//console.log(chainId)
	}, [
		isAuthenticated,
		isWeb3Enabled,
		enableWeb3,
		switchNetwork,
		isWeb3EnableLoading,
		chainId,
		Moralis.Chains.POLYGON_MUMBAI,
	])

	const login = async () => {
		await authenticate({
			provider: 'metamask',
			chainId: 80001,
			signingMessage:
				'Welcome from Greet, Sign this message to connect to the app',
		})
	}

	let styles: Record<string, CSSProperties> = {
		navbar: {
			border: 'none',
			background: theme.black,
			//background: opened ? theme.black : theme.white,
			height: '100%',
			display: !(nonHomePagePath.includes(router.pathname)) ? 'block' : 'none',
			// display:'flex',
			// flexDirection: 'row',
			// justifyContent:'center'
		},
		header: {},
		innerHeader: {
			borderBottom: '5px dashed',
			background: theme.black,
			borderImage:
				'linear-gradient(to right, #364fc7 0%, #3b5bdb 25%, #1c7eed 75%, #15aabf 100% )',
			borderImageSlice: 1,
			margin: 0,
			height: '70px',
		},
		secondHeader: {
			backgroundColor: theme.black,
			height: '50px',
			//width: "100%"
		},
		mobileUpperNavbarNormal: {
			fontSize: '',
		},
		footer: {},
	}

	return (
		<>
			<AppShell
				styles={{
					main: {
						background:
							theme.colorScheme === 'dark' ? theme.black : theme.colors.gray[0],
					},
				}}
				navbarOffsetBreakpoint='sm'
				asideOffsetBreakpoint='sm'
				fixed
				navbar={
					width >= theme.breakpoints.sm  ? (
						<Navbar
							p='md'
							hiddenBreakpoint='sm'
							width={{ sm: 150, lg: 300, md: 150, xl: 300, xxl: 500 }}
							style={styles.navbar}
							mt='lg'
						>
							<MainNavbar />
						</Navbar>
					) : (
						<></>
					)
				}
				aside={
					<MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
						<Aside
							p='md'
							hiddenBreakpoint='sm'
							width={{ sm: 150, lg: 300, md: 150, xl: 300, xxl: 500 }}
							style={{
								background: theme.black,
								height: '100%',
								display: (nonHomePagePath.includes(router.pathname)) || width <= theme.breakpoints.sm ? 'none' : 'block',
								//display: !homePage ? 'none' : 'block',
							}}
							mt='lg'
							hidden={nonHomePagePath.includes(router.pathname) || width <= theme.breakpoints.sm}
						>
							<Group
								position='center'
								style={{ width: '100%', display: homePage ? 'block' : 'none' }}
							>
								<Box
									sx={{
										width: '100%',
									}}
									p='md'
								>
									<Group position='center'>
										{/* <Text size='sm'>Following suggestion</Text> */}
									</Group>
								</Box>
							</Group>
						</Aside>
					</MediaQuery>
				}
				header={
					<>
						<Header height={70} style={styles.header}>
							<Modal
								opened={opened}
								title='Register'
								//onClose={() => router.push('/')}
								onClose={() => setOpened(false)}
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
										<Button
											mt='sm'
											onClick={handleRegister}
											loading={registering}
										>
											Register
										</Button>
									</Group>
								</>
							</Modal>
							<Grid justify='space-between' style={styles.innerHeader}>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										height: '100%',
									}}
								>
									<Link href='/' passHref>
										<UnstyledButton>
											<Text weight='bold' ml='sm' style={{ fontSize: '2rem' }}>
												Greet
											</Text>
										</UnstyledButton>
									</Link>
								</Box>

								<Group>
									{width >= theme.breakpoints.sm && isAuthenticated && (
										<>
											{data[0] && !isLoading && !isFetching ? (
												<>
													<Link href={'/newGreet'} scroll={false} passHref>
														<ActionIcon size='xl'>
															<Plus size={'100%'} />
														</ActionIcon>
													</Link>
													<ActionIcon size='xl'>
														<Bell size={'100%'} />
													</ActionIcon>
													<Link
														href={{pathname:"profile",query:{id:`${data[0].get('uid')}`}}}
														passHref
													>
														{/* <UnstyledButton mr='sm'>
													
												</UnstyledButton> */}
														<Group style={{ cursor: 'pointer' }}>
															<Avatar
																src={data[0]?.get('profile_pic')?.url()}
																size='md'
															>
																<CgProfile size='100%' />
															</Avatar>
															<Box>
																<Text
																	style={{
																		width: '120px',
																		overflow: 'hidden',
																		textOverflow: 'ellipsis',
																	}}
																	weight='bolder'
																>
																	{user?.get('ethAddress')}
																</Text>
																{data[0] ? data[0].get('userName') : 'Unnamed'}
															</Box>
														</Group>
													</Link>
												</>
											) : (
												<>
													<Group style={{ cursor: 'pointer' }}>
														<Avatar src={''} size='md'>
															<CgProfile size='100%' />
														</Avatar>
														<Box>
															<Text
																style={{
																	width: '120px',
																	overflow: 'hidden',
																	textOverflow: 'ellipsis',
																}}
																weight='bolder'
															>
																{account}
															</Text>
															{data[0] ? data[0].get('userName') : 'Unnamed'}
														</Box>
													</Group>
													<Button
														color='violet'
														size='md'
														onClick={() => setOpened(true)}
													>
														Register
													</Button>
												</>
											)}
										</>
									)}

									{!isAuthenticated ? (
										<Button color='indigo' size='md' mr='sm' onClick={login}>
											<Text size='md'>Connect</Text>
										</Button>
									) : (
										<>
											{/*If the user is not register, show the register button*/}
											{width <= theme.breakpoints.sm && !data[0] && (
												<Button
													color='violet'
													size='md'
													onClick={() => setOpened(true)}
												>
													Register
												</Button>
											)}
											<Button
												color='indigo'
												size='md'
												mr='sm'
												onClick={() => {
													router.push('/')
													logout()
													location.reload()
												}}
											>
												<Text size='md'>Disconnect</Text>
											</Button>
										</>
									)}
								</Group>
							</Grid>
						</Header>
					</>
				}
				footer={
					data[0] && <MobileNavBar profileId={data[0].get('uid')} image={data[0].get("profile_pic")?.url()} />
				}
			>
				{children}
				
			</AppShell>
		</>
	)
})

export default Page
