import {
	MouseEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import {
	Box,
	Card,
	Button,
	Group,
	Text,
	AspectRatio,
	useMantineTheme,
	Avatar,
	UnstyledButton,
	Menu,
	Divider,
	Drawer,
	Spoiler,
	ScrollArea,
	useMantineColorScheme,
	Indicator,
	Center,
	Loader,
	Image,
} from '@mantine/core'
import {
	useMediaQuery,
	useDidUpdate,
	useToggle,
	useViewportSize,
	useWindowScroll,
} from '@mantine/hooks'
import NextImage from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { MdFavorite, MdOutlineFavorite } from 'react-icons/md'
import { FaComment, FaEye } from 'react-icons/fa'
import { IconType, IconBaseProps } from 'react-icons'
import {
	AiOutlineLeft,
	AiOutlineRight,
	AiOutlineCheckCircle,
} from 'react-icons/ai'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import moment from 'moment'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import Link from 'next/link'
import config from '@/utils/config.json'
import { useCheckRegistered } from '@/hooks/useCheckRegistered'
import { hideNotification, showNotification } from '@mantine/notifications'
import { BiImageAdd, BiErrorCircle } from 'react-icons/bi'
import CommentInput from './comment/commentInput'
import CommentSection from './comment/commentSection'
//import fleekStorage from '@fleekhq/fleek-storage-js'

// interface feed {
// 	userName: string
// 	timestamp: string
// 	textContent: string
// 	images?: string[]
// 	video?: string
// 	verifyLink: string
// 	id: string
// }

interface feedButtonProps {
	count: number
	icon: React.ReactNode
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	liked?: boolean
}

let verifyLink = `https://mumbai.polygonscan.com/address/${config.contractAddress.Greet}#readContract`

const Feed = (props: Feed) => {
	const theme = useMantineTheme()
	const { width } = useViewportSize()
	let [mobile, setMobile] = useState<boolean>(false)
	const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false)
	const [MenuOpened, setMenuOpened] = useState<boolean>(false)
	const [liked, setLiked] = useState<boolean>(false)
	const [likeCount, setlikeCount] = useState<number>(0)
	const [viewCount, setViewCount] = useState<number>(0)
	const isRegistered = useCheckRegistered()
	const { user } = useMoralis()
	const { data, isLoading, isFetching } = useMoralisQuery('NewUser', (q) =>
		q.equalTo('userName', props.userName).limit(1)
	)

	const currentUser = useMoralisQuery(
		'NewUser',
		(q) => q.equalTo('userAddress', user?.get('ethAddress')).limit(1),
		[data]
	)

	const feedQuery = useMoralisQuery(
		'NewGreet',
		(q) => q.equalTo('uid', props.id),
		[],
		{
			live: true,
		}
	)

	const isLiked = useCallback(() => {
		if (data[0] && feedQuery.data[0] && user) {
			let feedLike = feedQuery.data[0].relation('likes')
			let query = feedLike
				.query()
				.equalTo('userAddress', user.get('ethAddress'))
			query.first().then((res) => {
				res ? setLiked(true) : setLiked(false)
				//console.log(res)
			})
		}
	}, [data, feedQuery.data, user])

	useEffect(() => {
		isLiked()
	}, [data, feedQuery.data, isLiked])

	useEffect(() => {
		if (feedQuery.data[0]) {
			let feedLike = feedQuery.data[0].relation('likes')
			feedLike
				.query()
				.count()
				.then((c) => {
					setlikeCount(c)
				})
			let feedView = feedQuery.data[0].relation('view')
			feedView
				.query()
				.count()
				.then((c) => {
					setViewCount(c)
				})
		}
	}, [feedQuery.data])

	useEffect(() => {
		let addView = async () => {
			let post = feedQuery.data[0]
			currentUser.data[0] && post.relation('view').add(currentUser.data[0])
			await post?.save()
		}
		addView()
	}, [])

	//const [currentPosition, setCurrentPosition] = useState<number>(0)

	const images: ReadonlyArray<ReactImageGalleryItem> | undefined =
		props.images?.map((i) => ({ original: i }))

	const FeedButton = (props: feedButtonProps) => {
		return (
			<UnstyledButton
				onClick={props.onClick}
				sx={{
					':hover': {
						color:
							theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[3],
					},
				}}
			>
				<Group align='center'>
					{props.icon}
					<Text size='sm'>{props.count}</Text>
				</Group>
			</UnstyledButton>
		)
	}

	//const image2:ReadonlyArray<ReactImageGalleryItem> = useMemo(()=>)

	const onOpenMenu = () => {
		if (mobile === true) {
			setMobileMenuOpened(true)
			setMenuOpened(false)
		}
	}

	const handleLike = async () => {
		if (!isRegistered) {
			hideNotification('registerError')
			showNotification({
				id: 'registerError',
				title: 'Error',
				message: 'Register or log in to like post',
				autoClose: 2500,
				disallowClose: true,
				color: 'red',
				icon: <BiErrorCircle size='100%' />,
			})
			return
		}
		setLiked(true)
		let post = feedQuery.data[0]
		if (currentUser.data[0] && !liked) {
			post.relation('likes')?.add(currentUser.data[0])
			await post.save()
		} else {
			post.relation('likes')?.remove(currentUser.data[0])
			await post.save()
		}
	}

	useEffect(() => {
		if (width < 900) {
			setMobile(true)
			setMenuOpened(false)
		} else {
			setMobile(false)
			setMobileMenuOpened(false)
		}
	}, [width])

	return (
		<Group position='center'>
			<Box
				my='md'
				style={{ width: width <= theme.breakpoints.sm ? '100%' : '70%' }}
			>
				<Card
					p='lg'
					style={{
						backgroundColor:
							theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
						border: '1px solid',
						borderColor: theme.colors.gray[7],
					}}
					radius='md'
				>
					<Group position='apart'>
						<Link
							href={{ pathname: 'profile', query: { id: data[0]?.get('uid') } }}
							passHref
						>
							<Group style={{ cursor: 'pointer' }}>
								<Indicator
									position='top-end'
									size={10}
									color='green'
									style={{ zIndex: '0' }}
									disabled={true}
								>
									<Avatar
										radius='lg'
										color='dark'
										size={40}
										src={data[0]?.get('profile_pic')?.url()}
										//imageProps={<Image src={data[0]?.get('profile_pic')?.url()} alt='' placeholder='blur'/>}
									>
										<CgProfile size={'100%'} />
									</Avatar>
								</Indicator>
								<Box>
									<Text weight={500} >{props.userName}</Text>
									<Text
										size='sm'
										style={{ color: theme.colors.gray[6], lineHeight: 1.5 }}
									>
										{/* {props.timestamp} */}
										{moment(parseInt(props.timestamp) * 1000).fromNow()}
									</Text>
								</Box>
							</Group>
						</Link>
						<Group>
							<div>
								<Text
									size='xs'
									style={{ color: theme.colors.gray[6], lineHeight: 1.5 }}
								>
									GreetID: {props.id}
								</Text>
							</div>
							<Menu
								position='left'
								size='xl'
								mr='sm'
								onClick={onOpenMenu}
								opened={MenuOpened}
								onOpen={() => setMenuOpened(true)}
								onClose={() => setMenuOpened(false)}
							>
								<Menu.Label>Greet menu</Menu.Label>
								<a href={verifyLink} target='_blank' rel='noreferrer'>
									<Menu.Item icon={<AiOutlineCheckCircle size={20} />}>
										Verify this Greet
									</Menu.Item>
								</a>
							</Menu>
						</Group>
					</Group>
					<Box my='sm'>
						<Spoiler maxHeight={120} hideLabel={'Hide'} showLabel={'Show more'}>
							<Text size='sm' style={{ whiteSpace: 'pre-line' }}>
								{props.textContent}
							</Text>
						</Spoiler>
					</Box>

					<Card.Section>
						{images && (
							<ImageGallery
								items={images ? images : []}
								showThumbnails={false}
								//showIndex={true}
								showBullets={images ? images.length > 1 : false}
								showPlayButton={false}
								showFullscreenButton={false}
								showNav={width > theme.breakpoints.sm}
								renderItem={(item) => (
									<Image
										src={item.original}
										alt=''
										withPlaceholder={true}
										placeholder={
											<Center>
												<Loader variant='bars' color='indigo' />
											</Center>
										}
									/>
								)}
								renderLeftNav={(onClick, disabled) => (
									<UnstyledButton
										type='button'
										className='image-gallery-icon image-gallery-left-nav'
										disabled={disabled}
										onClick={onClick}
										aria-label='Previous Slide'
										sx={{
											height: '100%',
										}}
									>
										<AiOutlineLeft size={20} />
									</UnstyledButton>
								)}
								renderRightNav={(onClick, disabled) => (
									<UnstyledButton
										type='button'
										className='image-gallery-icon image-gallery-right-nav'
										disabled={disabled}
										onClick={onClick}
										aria-label='Next Slide'
										sx={{
											height: '100%',
										}}
									>
										<AiOutlineRight size={20} />
									</UnstyledButton>
								)}
							/>
						)}
					</Card.Section>
					<Box mr='sm'>
						<Group position='right' mt='lg' style={{ width: '100%' }}>
							<FeedButton
								icon={
									<MdOutlineFavorite
										size={20}
										className='feedButton'
										color={liked ? 'red' : 'none'}
									/>
								}
								count={likeCount}
								onClick={handleLike}
							/>
							<FeedButton
								icon={<FaComment size={20} className='feedButton' />}
								count={0}
							/>

							<Group align='center'>
								<FaEye size={20} className='feedButton' />
								<Text size='sm'>{viewCount}</Text>
							</Group>
						</Group>
					</Box>
					<CommentSection/>
				</Card>
			</Box>
			<Drawer
				opened={mobileMenuOpened}
				onClose={() => setMobileMenuOpened(false)}
				position='bottom'
				size='lg'
				title={<Text p='md'>Greet Menu</Text>}
			>
				<ScrollArea
					type='auto'
					style={{ height: 300 }}
					scrollbarSize={5}
					mx='sm'
				>
					<Group position='center' style={{ width: '100%' }}>
						<a
							href={verifyLink}
							target='_blank'
							rel='noreferrer'
							style={{ width: '100%' }}
						>
							<DrawerButton
								text='Verify this Greet'
								icon={<AiOutlineCheckCircle />}
							/>
						</a>
					</Group>
				</ScrollArea>
			</Drawer>
		</Group>
	)
}

const DrawerButton = ({
	text,
	icon,
}: {
	icon?: React.ReactNode
	text: string
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) => {
	return (
		<UnstyledButton
			sx={(theme) => ({
				width: '100%',
				'&:hover': {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[5]
							: theme.colors.gray[0],
				},
			})}
			p='md'
		>
			<Group position='center'>
				{icon}
				<Text size='sm'>{text}</Text>
			</Group>
		</UnstyledButton>
	)
}

export default Feed
