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
import { gql, useQuery } from '@apollo/client'
import { Query } from '@/graphql/cyberConnect'

const ProfileFollowing = () => {
	const theme = useMantineTheme()
	const router = useRouter()
	const { id } = router.query
	const { Moralis, isInitialized, user } = useMoralis()
	const { data, isLoading } = useMoralisQuery(
		'NewUser',
		(q) => q.equalTo('uid', id).limit(1),
		[id]
	)
	const followings = useQuery<Query>(
		gql`
			query IdentityQuery($address: String!) {
				identity(address: $address, network: ETH) {
					followingCount
					followings {
						list {
							address
						}
					}
				}
			}
		`,
		{
			variables: {
				address: data[0]?.get('userAddress'),
			},
		}
	)
	const followingsQuery = useMoralisQuery(
		'NewUser',
		(q) =>
			q.containedIn(
				'userAddress',
				followings.data?.identity.followings.list.map((d) => d.address) as any
			),
		[followings.data]
	)

	return (
		<>
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
					<Text mb='md'>Followings of {data[0]?.get('userName')}</Text>
					{!followings.error &&
						!followings.loading &&
						followingsQuery.data.map((d, i) => (
							<Link href={`/profile/${d?.get('uid')}`} passHref key={i}>
								<Group
									position='left'
									align='center'
									px='md'
									sx={{
										cursor:"pointer",
										"&:hover":{
											backgroundColor:theme.colors.dark[7]
										}
									}}
								>
									<Avatar
										radius='lg'
										color='dark'
										mb='sm'
										size={40}
										src={d?.get('profile_pic')?.url()}
									>
										<CgProfile size={'100%'} />
									</Avatar>
									<Box my='md'>
										<Title order={5} style={{ color: 'white' }}>
											{d?.get('userName')}
										</Title>
										<Box>
											<Text size='sm'>Address:</Text>
											<Text color='white' size='sm'>
												{d?.get('userAddress')}
											</Text>
										</Box>
									</Box>
								</Group>
							</Link>
						))}
				</Card>
			)}
		</>
	)
}

export default ProfileFollowing
