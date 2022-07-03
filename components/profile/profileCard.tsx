import Page from '@/components/main/Page'
import {
	MouseEventHandler,
	ReactElement,
	useEffect,
	useMemo,
	useState,
} from 'react'
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
import { Connection, Query } from '@/graphql/cyberConnect'
import axios from 'axios'
import { useCyberConnect } from '@/hooks/useCyberConnect'
import { ConnectionType } from '@cyberlab/cyberconnect'

interface ProfileProps {
	userName: string
	description: string
	image: string
	greetCount: number
	likeCount: number
	self: boolean
	id: string | string[] | undefined
	from: string
	to: string
}

const ProfileCard = (props: ProfileProps) => {
	const theme = useMantineTheme()
	const [followLoading, setFollowLoading] = useState<boolean>(false)
	const cyberConnect = useCyberConnect()
	const connectionQuery = useQuery<Query>(
		gql`
			query ProofQuery($from: String!, $to: String!) {
				connections(fromAddr: $from, toAddrList: [$to], network: ETH) {
					followStatus {
						isFollowed
						isFollowing
					}
				}
			}
		`,
		{
			variables: {
				from: props.from,
				to: props.to,
			},
		}
	)

	const followQuery = useQuery<Query>(
		gql`
			query IdentityQuery($address: String!) {
				identity(address: $address, network: ETH) {
					followingCount
					followerCount
				}
			}
		`,
		{
			variables: {
				address: props.to,
			},
		}
	)

	let isFollowed = useMemo(
		() => connectionQuery.data?.connections[0]?.followStatus?.isFollowing,
		[connectionQuery]
	)

	const handleFollow = async () => {
		setFollowLoading(true)
		await cyberConnect?.connect(props.to, ConnectionType.FOLLOW)
		await connectionQuery.refetch()
		await followQuery.refetch()
		setFollowLoading(false)
	}
	const handleUnfollow = async () => {
		setFollowLoading(true)
		await cyberConnect?.disconnect(props.to, ConnectionType.FOLLOW)
		await connectionQuery.refetch()
		await followQuery.refetch()
		setFollowLoading(false)
	}

	let FollowButton = ({ followed }: { followed: boolean | undefined }) => (
		<>
			{!followed && followed !== undefined ? (
				<Button
					variant='outline'
					onClick={handleFollow}
					//disabled={isFollowed}
					hidden={followed === undefined}
					loading={followLoading}
				>
					Follow
				</Button>
			) : (
				<Button
					variant='outline'
					onClick={handleUnfollow}
					//disabled={isFollowed}
					hidden={followed === undefined}
					loading={followLoading}
				>
					Followed
				</Button>
			)}
		</>
	)

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

						{!props.self && !connectionQuery.loading && (
							<FollowButton followed={isFollowed} />
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
								{followQuery.data?.identity.followerCount || 0}
							</Text>
							<Text size='sm' align='center'>
								Followers
							</Text>
						</Box>
					</Link>

					<Link href={`/profile/following/${props.id}`} passHref>
						<Box style={{ cursor: 'pointer' }}>
							<Text size='sm' weight='bold' align='center'>
								{followQuery.data?.identity.followingCount || 0}
							</Text>
							<Text size='sm' align='center'>
								Following
							</Text>
						</Box>
					</Link>
					{/* <Box>
						<Text size='sm' weight='bold' align='center'>
							{props.likeCount}
						</Text>
						<Text size='sm' align='center'>
							Like
						</Text>
					</Box> */}
				</Group>
			</Card>
		</>
	)
}

export default ProfileCard
