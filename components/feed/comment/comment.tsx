import { useSearchUserById } from '@/hooks/useSearchUserById'
import {
	Avatar,
	Box,
	createStyles,
	Group,
	useMantineTheme,
	Text,
	Spoiler,
	Menu,
	ActionIcon,
	Image,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import moment from 'moment'
import Link from 'next/link'
//import Image from "next/image"
import { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { useMoralis } from 'react-moralis'

export interface CommentProps {
	text: string
	image?: string
	timestamp: string
	userName: string
	userId: string
	self: boolean
	commentId: string
	updateCount: () => void
	deleteCommentUpdate: (id:string)=>void
	//commentObject:Moralis.Object<Moralis.Attributes>
}

const Comment: React.FC<CommentProps> = ({
	text,
	image,
	timestamp,
	self,
	userName,
	userId,
	commentId,
	updateCount,
	deleteCommentUpdate
}) => {
	const theme = useMantineTheme()
	const { Moralis } = useMoralis()
	const [menuOpened, setMenuOpened] = useState(false)
	const { result: user } = useSearchUserById(userId)
	const { classes, cx } = useStyles()

	const handleCommentDelete = async () => {
		const commentQuery = new Moralis.Query('GreetComment')
		commentQuery.equalTo('objectId', commentId)
		const result = await commentQuery.first()
		console.log(commentId)
		await result?.destroy()
		showNotification({
			title: 'Success',
			message: 'Comment deleted',
			autoClose: 2500,
			disallowClose: true,
			color: 'green',
		})
		deleteCommentUpdate(commentId)
		updateCount()
	}

	return (
		<Box my='md'>
			<Group position='left' spacing={'xs'} align='flex-start' my='xs'>
				<Link href={{ pathname: '/profile', query: { id: userId } }} passHref>
					<Avatar
						radius='lg'
						color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
						size={40}
						src={user?.get('profile_pic').url() || ''}
						className={classes.profileLink}
					>
						<CgProfile size={'100%'} />
					</Avatar>
				</Link>
				<Box className={classes.comment} p='xs'>
					<Group position='apart' spacing={5} className={classes.commentHeader}>
						<Group spacing={5}>
							<Link href={{ pathname: '/profile', query: { id: userId } }} passHref>
								<Text
									weight='bold'
									size='sm'
									className={
										self
											? cx(classes.commentBySelf, classes.profileLink)
											: cx(classes.commentUserName, classes.profileLink)
									}
									variant='link'
								>
									{userName}
								</Text>
							</Link>
							<Text size='sm' color='dimmed'>
								{moment(parseInt(timestamp)).fromNow()}
							</Text>
						</Group>
						<Menu
							position='bottom-start'
							offset={0}
							opened={menuOpened}
							onChange={setMenuOpened}
						>
							<Menu.Target>
								<ActionIcon>
									<BiDotsHorizontalRounded size={'100%'} />
								</ActionIcon>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Label>
									<Text size={'xs'}>Comment Action</Text>
								</Menu.Label>
								{self && (
									<Menu.Item color={'red'} onClick={handleCommentDelete}>
										Delete Comment
									</Menu.Item>
								)}
							</Menu.Dropdown>
						</Menu>
					</Group>
					<Spoiler
						maxHeight={100}
						hideLabel={'Hide'}
						showLabel={'Show more'}
						styles={{
							control: {
								color: theme.colors.indigo,
								fontSize: theme.fontSizes.sm,
							},
						}}
					>
						<Text
							size='sm'
							style={{
								wordBreak: 'break-word',
								whiteSpace: 'pre-line',
							}}
						>
							{text}
						</Text>
					</Spoiler>
					{image && <Image src={image} alt='' />}
				</Box>
			</Group>
		</Box>
	)
}

const useStyles = createStyles((theme) => {
	return {
		comment: {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[4]
					: theme.colors.gray[1],
			borderRadius: theme.radius.md,
			maxWidth: '80%',
		},
		commentHeader: {
			width: '100%',
		},
		commentUserName: {
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
		commentBySelf: {
			color: theme.colors.indigo[3],
		},
		profileLink: {
			cursor: 'pointer',
		},
	}
})

export default Comment
