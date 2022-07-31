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
import { useRouter } from 'next/router'
import Register from '../components/main/register'
import { useEffect, useState } from 'react'
import { useChain, useMoralis } from "react-moralis"
import { GreetUser } from "@/typechain-types"
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import config from '@/utils/config.json'
import { Contract } from 'ethers'


const Following = () => {
	const router = useRouter()
	const [opened, setOpened] = useState<boolean>(false)
	const { Moralis, web3 } = useMoralis()
	const { web3Library } = Moralis
	const { account } = useChain()



	useEffect(() => {
		let userContract = new Contract(
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
		<>
			<Register open={opened}/>


			{/* <FeedList
				feeds={feeds}
				filter={FeedFilter.Trending}
				isFollowing={false}
			/> */}
		</>
	)
}

export default Following
