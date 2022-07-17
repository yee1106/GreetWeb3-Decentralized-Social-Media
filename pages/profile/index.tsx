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
import { usePostFromUser } from '@/hooks/usePost'
import { observer } from 'mobx-react-lite'
import { useSearchUserById } from '@/hooks/useSearchUserById'

const Profile = () => {
	const router = useRouter()
	const id = router.query["id"]
	let { result: userByid, userName, greetCount,self, loading } = useSearchUserById(id)
	let {feed,fetchMore,hasMore} = usePostFromUser({userId:id})
	const { user } = useMoralis()

	useEffect(()=>{
		console.log(feed)
	},[feed])


	return (
		<>
			<Link href='/' passHref>
				<Button variant='outline'>Back</Button>
			</Link>
			{userByid?.get('userAddress') && user?.get('ethAddress') && (
				<ProfileCard
					userName={userName}
					image={userByid?.get('profile_pic')?.url()}
					greetCount={greetCount}
					description={userByid?.get('description')}
					likeCount={0}
					self={self}
					id={id || undefined}
					from={user?.get('ethAddress')}
					to={userByid.get('userAddress')}
				/>
			)}
			{feed.length > 0 && (
				<Title order={4} mt='sm' ml='sm'>
					All Greets from {userName}
				</Title>
			)}
			{feed.length !== 0 && (
				<FeedList
					feeds={feed || []}
					filter={FeedFilter.Trending}
					isFollowing={true}
					hasMore={hasMore}
					fetchMore={fetchMore}
				/>
			)}
		</>
	)
}

export default observer(Profile)
