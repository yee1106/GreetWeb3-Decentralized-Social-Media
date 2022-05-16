import { useEffect, useMemo, useState } from 'react'
import {
	Box,
	Card,
	Button,
	Group,
	Image,
	Text,
	AspectRatio,
	useMantineTheme,
	Avatar,
	UnstyledButton,
	Menu,
	Divider,
	Drawer,
	Spoiler,
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
import { useMoralisQuery } from 'react-moralis'
import Link from 'next/link'
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

let verifyLink =
	'https://mumbai.polygonscan.com/address/0x254db072a0981919ab7f86351528324b3c954e40#readContract'

const Feed = (props: Feed) => {
	const theme = useMantineTheme()
	const { width } = useViewportSize()
	let [mobile, setMobile] = useState<boolean>(false)
	const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false)
	const [MenuOpened, setMenuOpened] = useState<boolean>(false)
	const { data, isLoading } = useMoralisQuery('NewUser', (q) =>
		q.equalTo('userName', props.userName).limit(1)
	)
	const profileQuery = useMoralisQuery('_User', (q) =>
		q.equalTo('ethAddress', data[0]?.get("userAddress")).limit(1)
	,[data])

	//const [currentPosition, setCurrentPosition] = useState<number>(0)

	const images: ReadonlyArray<ReactImageGalleryItem> | undefined =
		props.images?.map((i) => ({ original: i }))

	const FeedButton = (props: feedButtonProps) => {
		return (
			<UnstyledButton
				onClick={props.onClick}
				sx={{
					':hover': {
						color: theme.white,
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
						backgroundColor: theme.colors.dark[9],
						border: '1px solid',
						borderColor: theme.colors.gray[7],
					}}
				>
					<Group position='apart'>
						<Link href={`/profile/${data[0]?.get('uid')}`} passHref>
							<Group style={{ cursor: 'pointer' }}>
								<Avatar radius='lg' color='dark' src={profileQuery.data[0]?.get("profilePic")?.url()}>
									<CgProfile size={40} />
								</Avatar>
								<div>
									<Text weight={500}>{props.userName}</Text>
									<Text
										size='sm'
										style={{ color: theme.colors.gray[6], lineHeight: 1.5 }}
									>
										{/* {props.timestamp} */}
										{moment(parseInt(props.timestamp) * 1000).format(
											'Do MMMM YYYY'
										)}
									</Text>
									<Text
										size='sm'
										style={{ color: theme.colors.gray[6], lineHeight: 1.5 }}
									>
										{/* {props.timestamp} */}
										{moment(parseInt(props.timestamp) * 1000).format(
											'h:mm:ss a'
										)}
									</Text>
								</div>
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
							<Text color='white' size='sm' style={{ whiteSpace: 'pre-line' }}>
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
					<Box>
						<Group position='center'>
							<Group
								position='apart'
								mx='xs'
								px='lg'
								mt='lg'
								style={{ width: '100%' }}
							>
								<FeedButton
									icon={<MdOutlineFavorite size={20} className='feedButton' />}
									count={0}
								/>
								<FeedButton
									icon={<FaComment size={20} className='feedButton' />}
									count={0}
								/>

								<Group align='center'>
									<FaEye size={20} className='feedButton' />
									<Text size='sm'>0</Text>
								</Group>
							</Group>
						</Group>
					</Box>
				</Card>
			</Box>
			<Drawer
				opened={mobileMenuOpened}
				onClose={() => setMobileMenuOpened(false)}
				position='bottom'
				size='md'
				title={'Greet Menu'}
			>
				{/* <UnstyledButton style={{width: "100%"}}>
					<Group align='center'>
						<CircleCheck/>
						<Text size='sm'>Verify this Greet</Text>
					</Group>
				</UnstyledButton>
        <Group align='center' style={{width:'100%'}}>
						<CircleCheck/>
						<Text size='sm'>Verify this Greet</Text>
				</Group> */}
				<Group position='center' style={{ width: '100%' }}>
					<a href={verifyLink} target='_blank' rel='noreferrer'>
						<UnstyledButton
							sx={{
								width: '100%',
								'&:hover': {
									backgroundColor: theme.colors.dark[5],
								},
							}}
							p='md'
						>
							<Group position='left'>
								<AiOutlineCheckCircle />
								<Text size='sm'>Verify this Greet</Text>
							</Group>
						</UnstyledButton>
					</a>
				</Group>
			</Drawer>
		</Group>
	)
}

export default Feed
