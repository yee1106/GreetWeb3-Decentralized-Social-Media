import Page from '@/components/main/Page'
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
	ActionIcon,
	Avatar,
	Box,
	Button,
	Card,
	Group,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core'
import { AiOutlineSetting } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { useRouter } from 'next/router'
import ProfileCard from '@/components/profile/profileCard'
import { useChain, useMoralis, useMoralisQuery } from 'react-moralis'
import FeedList from '@/components/feed/feedList'
import { FeedFilter } from '@/utils/constants/constants'
import axios from 'axios'
import Moralis from 'moralis/types'

const Profile = () => {
	const router = useRouter()
	const { id } = router.query
	const [greetCount, setGreetCount] = useState<number>(0)
	const { Moralis, isInitialized, isInitializing, user, isAuthenticating } =
		useMoralis()
	const [userId, setId] = useState<string>('')
	const [userName, setUserName] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [self, setSelf] = useState<boolean>(false)
	const [feeds, setFeeds] = useState<Feed[]>()
	const [userByid, setUserById] = useState<
		Moralis.Object<Moralis.Attributes> | undefined
	>(undefined)
	const { data, isLoading } = useMoralisQuery(
		'NewGreet',
		(q) =>
			q
				.equalTo('creator', userByid?.get('userAddress'))
				.notEqualTo('uri', '')
				.descending('timestamp_decimal')
				.limit(10),
		[userByid?.get('userAddress')]
	)
	const profileQuery = useMoralisQuery('_User', (q) =>
		q.equalTo('ethAddress', userByid?.get("userAddress")).limit(1)
	,[userByid?.get("userAddress")])


	let getUserData = useCallback(async () => {
		if (isInitialized) {
			//setLoading(true)
			let userNameQuery = new Moralis.Query('NewUser')
			let searchedUser = await userNameQuery.equalTo('uid', id).first()
			setUserName(searchedUser?.get('userName'))
			setUserById(searchedUser)
			let greetCountQuery = new Moralis.Query('NewGreet')
			let greetCount = await greetCountQuery
				.equalTo('creator', searchedUser?.get('userAddress'))
				.notEqualTo('uri', '')
				.count()
			setGreetCount(greetCount)
			let isSelf = user?.get('ethAddress') === searchedUser?.get('userAddress')
			setSelf(isSelf)
			//setLoading(false)
		}
	}, [isInitialized, Moralis.Query, id, user])

	useEffect(() => {
		getUserData()
	}, [user, getUserData])

	const fetchAllMetaData = useCallback(async () => {
		let allData = await Promise.all(
			data.map((d) => {
				return axios.get<GreetMetaData>(d.get('uri'))
			})
		)
		let id = data.map((d) => d.get('uid') as string)
		let timestamp = data.map((d) => d.get('timestamp') as string)

		let formattedData: Feed[] = allData.map(({ data }, i) => ({
			userName: data.creatorName,
			id: id[i],
			images: data.images?.map((i) => i.URI),
			textContent: data.text,
			timestamp: timestamp[i],
		}))
		setFeeds(formattedData)
	}, [data])

	useEffect(() => {
		console.log(data)
		fetchAllMetaData()
	}, [data, fetchAllMetaData])

	useEffect(()=>{
		if(!profileQuery.isLoading){
			console.log(profileQuery.data[0]?.get("ethAddress"))
		}
	},[profileQuery.data])

	return (
		<>
			<Link href='/' passHref>
				<Button variant='outline'>Back</Button>
			</Link>
			{userByid?.get("userAddress") && user?.get("ethAddress") && (
				<ProfileCard
					userName={userName}
					image={userByid?.get("profile_pic")?.url()}
					greetCount={greetCount}
					description={userByid?.get("description")}
					likeCount={0}
					self={self}
					id={id}
					from={user?.get("ethAddress")}
					to={userByid.get("userAddress")}
				/>
			)}
			{data.length > 0 && (
				<Title order={4} mt='sm' ml='sm'>
					All Greets from {userName}
				</Title>
			)}
			{!isLoading && (
				<FeedList
					feeds={feeds ? feeds : []}
					filter={FeedFilter.Trending}
					isFollowing={true}
					hasMore={false}
					fetchMore={()=>{}}
				/>
			)}
		</>
	)
}

export default Profile
