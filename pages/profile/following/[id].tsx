import Page from '@/components/main/Page'
import { ReactElement, useEffect, useMemo, useState } from 'react'
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
import { useMoralis, useMoralisQuery } from 'react-moralis'

const ProfileFollowing = () => {
	const theme = useMantineTheme()
	const router = useRouter()
	const { id } = router.query
	const { Moralis, isInitialized, user } = useMoralis()
	const { data, isLoading } = useMoralisQuery(
		'NewUser',
		(q) => q.equalTo('uid', id),
		[id]
	)

	return (
		<Page title={'Test'} homePage={true}>
			<Link href='/' passHref>
				<Button variant='outline'>Back</Button>
			</Link>
			{!isLoading && (
				<Card
					p='lg'
					style={{
						backgroundColor: theme.colors.dark[9],
						border: '1px solid',
						borderColor: theme.colors.gray[7],
					}}
					radius='lg'
					mt='sm'
				>
					Following of {data[0]?.get('userName')}
				</Card>
			)}
		</Page>
	)
}

export default ProfileFollowing
