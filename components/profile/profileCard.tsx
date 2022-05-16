import Page from '@/components/main/Page'
import { MouseEventHandler, ReactElement, useEffect, useState } from 'react'
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
import { gql, useQuery } from '@apollo/client'
import { Connection } from '@/graphql/cyberConnect'
import axios from 'axios'

interface ProfileProps {
	userName: string
	description: string
	image: string
	greetCount: number
	likeCount: number
	self: boolean
	id: string | string[] | undefined
	// isFollowed: boolean
	followButtonHandle: MouseEventHandler<HTMLButtonElement>
	unfollowButtonHandle: MouseEventHandler<HTMLButtonElement>
	from: string
	to: string
}

const ProfileCard = (props: ProfileProps) => {
	const theme = useMantineTheme()
	const [isFollowed, setIsFollowed] = useState<boolean>(false)
	const [followingCount, setFollowingCount] = useState<number>(0)
	const [followerCount, setFollowerCount] = useState<number>(0)

	// const connectionQuery = useQuery<Connection[]>(
	// 	gql`
	// 		query ProofQuery($from: String!, $to: String!) {
	// 			connections(fromAddr: $from, toAddrList: [$to], network: ETH) {
	// 				proof
	// 				followStatus {
	// 					isFollowed
	// 					isFollowing
	// 				}
	// 			}
	// 		}
	// 	`,
	// 	// {
	// 	// 	variables: {
	// 	// 		from: user?.get('ethAddress') || account,
	// 	// 		to: userByid?.get('userAddress'),
	// 	// 	},
	// 	// }
	// 	{
	// 		variables: {
	// 			from: props.from,
	// 			to: props.to,
	// 		},
	// 	}
	// )

	// useEffect(() => {
	// 	if (connectionQuery.data && !connectionQuery.loading) {
	// 		console.log(connectionQuery.data)
	// 	}
	// }, [connectionQuery.data, connectionQuery.loading])

	useEffect(() => {
		fetchFollowStatus()
		fetchFollowingCount()
		fetchFollowerCount()
	}, [props.to])

	const fetchFollowStatus = () => {
		axios
			.post(
				'https://api.stg.cybertino.io/connect/',
				JSON.stringify({
					query: `
				query ProofQuery($from: String!, $to: String!) {
					connections(fromAddr: $from, toAddrList: [$to], network: ETH) {
						namespace
						proof
						followStatus {
							isFollowed
							isFollowing
						}
					}
				}
				`,
					variables: {
						from: props.from,
						to: props.to,
					},
				}),
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => res.data)
			.then((result) => {
				setIsFollowed(result.data.connections[0]?.followStatus.isFollowing)
			})
			.catch()
	}

	const fetchFollowingCount = () => {
		axios
			.post(
				'https://api.stg.cybertino.io/connect/',
				JSON.stringify({
					query: `
					query IdentityQuery($address :String!){
						identity(address: $address, network: ETH) {
							followingCount
						}
					}
				`,
					variables: {
						address: props.to,
					},
				}),
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => res.data)
			.then((result) => {
				//setIsFollowed(result.data.connections[0]?.followStatus.isFollowing)
				setFollowingCount(result.data.identity?.followingCount)
				console.log(result.data.identity?.followingCount)
			})
			.catch()
	}

	const fetchFollowerCount = () => {
		axios
			.post(
				'https://api.stg.cybertino.io/connect/',
				JSON.stringify({
					query: `
					query IdentityQuery($address :String!){
						identity(address: $address, network: ETH) {
							followerCount
						}
					}
				`,
					variables: {
						address: props.to,
					},
				}),
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => res.data)
			.then((result) => {
				//setIsFollowed(result.data.connections[0]?.followStatus.isFollowing)
				setFollowerCount(result.data.identity?.followerCount)
				console.log(result.data.identity?.followerCount)
			})
			.catch()
	}

	return (
		<>
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
				<Group position='apart' align='center' mb='sm'>
					<Text size='lg' weight='bold' align='center'>
						Profile
					</Text>
					{props.self && (
						<Link href='/profile/setting' passHref>
							<ActionIcon mr='sm' size='xl'>
								<AiOutlineSetting size={30} />
							</ActionIcon>
						</Link>
					)}
					{/* {!self && ()} */}
				</Group>
				<Group position='center' align='flex-start'>
					<Group direction='column' position='center' align='center'>
						<Avatar
							radius='lg'
							color='dark'
							mb='sm'
							size={80}
							src={props.image}
						>
							<CgProfile size={'100%'} />
						</Avatar>
						<Title order={5}>{props.userName}</Title>
						{props.description && <Text size='sm'>{props.description}</Text>}
						{!props.self && !isFollowed && (
							<Button
								variant='outline'
								onClick={props.followButtonHandle}
								//disabled={isFollowed}
							>
								Follow
							</Button>
						)}
						{!props.self && isFollowed && (
							<Button
								variant='outline'
								onClick={props.followButtonHandle}
								//disabled={isFollowed}
							>
								Followed
							</Button>
						)}
					</Group>
				</Group>
				<Group position='center' mt='md'>
					<Box>
						<Text size='sm' weight='bold' align='center'>
							{props.greetCount}
						</Text>
						<Text size='sm' align='center'>
							Greets
						</Text>
					</Box>
					<Link href={`/profile/followers/${props.id}`} passHref>
						<Box style={{ cursor: 'pointer' }}>
							<Text size='sm' weight='bold' align='center'>
								{followerCount}
							</Text>
							<Text size='sm' align='center'>
								Followers
							</Text>
						</Box>
					</Link>

					<Link href={`/profile/following/${props.id}`} passHref>
						<Box style={{ cursor: 'pointer' }}>
							<Text size='sm' weight='bold' align='center'>
								{followingCount}
							</Text>
							<Text size='sm' align='center'>
								Following
							</Text>
						</Box>
					</Link>
					<Box>
						<Text size='sm' weight='bold' align='center'>
							{props.likeCount}
						</Text>
						<Text size='sm' align='center'>
							Like
						</Text>
					</Box>
				</Group>
			</Card>
		</>
	)
}

export default ProfileCard
