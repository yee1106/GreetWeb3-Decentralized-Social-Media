import {
	Group,
	UnstyledButton,
	Text,
	useMantineTheme,
	MantineTheme,
	Navbar,
	createStyles,
} from '@mantine/core'
import {
	CircleCheck,
	Home,
	Compass,
	Plus,
	Bell,
	Icon,
} from 'tabler-icons-react'
import { MdFavorite, MdOutlineFavorite } from 'react-icons/md'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { useViewportSize } from '@mantine/hooks'
import { nonHomePagePath } from '@/utils/constants/constants'

interface navLinkProps {
	color: string
	href: string
	icon: React.ReactElement<Icon | IconType>
	text: string
	textColor?: string
	//router:NextRouter
}

const MainNavLink = ({ color, icon, href, text, textColor }: navLinkProps) => {
	let router = useRouter()

	return (
		<Link href={href} passHref scroll={false}>
			<UnstyledButton
				sx={{
					width: '100%',
					'&:hover': {
						backgroundColor: color,
					},
				}}
				p='md'
			>
				<Group position='left' align='center'>
					{icon}
					<Text size='lg' style={{ color: textColor }}>
						{text}
					</Text>
				</Group>
			</UnstyledButton>
		</Link>
	)
}

const links = {
	home: '/',
	//following: '/following',
	explore: '/explore',
}

export const MainNavbar = () => {
	const theme = useMantineTheme()
	const {width} = useViewportSize()
	const router = useRouter()
	const {classes} = useStyles({router})
	let setActive = (route: string) =>
		router.pathname === route
			? theme.colors.indigo[7]
			: theme.colorScheme === 'dark'
			? theme.colors.dark[0]
			: theme.black
	return width >= theme.breakpoints.sm ? (
		<Navbar
			p='md'
			hiddenBreakpoint='sm'
			width={{ sm: 150, lg: 300, md: 150, xl: 300, xxl: 500 }}
			className={classes.navbar}
			mt='lg'
		>
			<Group position='center' direction='row' style={{ width: '100%' }}>
				<MainNavLink
					color={
						theme.colorScheme === 'dark'
							? theme.colors.dark[5]
							: theme.colors.gray[0]
					}
					href={links.home}
					icon={<Home color={setActive(links.home)} />}
					text='Home'
					textColor={setActive(links.home)}
				/>
				{/* <MainNavLink
				color={theme.colors.dark[5]}
				href={links.following}
				icon={
					<MdOutlineFavorite size={20} color={setActive(links.following)} />
				}
				text='Following'
				textColor={setActive(links.following)}
			/> */}
				<MainNavLink
					color={
						theme.colorScheme === 'dark'
							? theme.colors.dark[5]
							: theme.colors.gray[0]
					}
					href={links.explore}
					icon={<Compass size={20} color={setActive(links.explore)} />}
					text='Explore'
					textColor={setActive(links.explore)}
				/>
			</Group>
		</Navbar>
	) : (
		<></>
	)
}

const useStyles = createStyles((theme,{router}:{router:NextRouter})=>{
	return{
		navbar: {
			border: 'none',
			background: theme.colorScheme === 'dark' ? theme.black : theme.white,
			height: '100%',
			display: !nonHomePagePath.includes(router.pathname) ? 'block' : 'none',
		},
	}
})

export default MainNavbar
