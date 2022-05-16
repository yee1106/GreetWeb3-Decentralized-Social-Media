import {
	Group,
	UnstyledButton,
	Text,
	useMantineTheme,
	MantineTheme,
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
		<Link href={href} passHref>
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
	following: '/following',
	explore: '/explore',
}

export const MainNavbar = () => {
	const theme = useMantineTheme()
	const router = useRouter()
	let setActive = (route: string) =>
		router.pathname === route ? theme.colors.indigo[7] : theme.colors.dark[0]
	return (
		<Group position='center' direction='row' style={{ width: '100%' }}>
			<MainNavLink
				color={theme.colors.dark[5]}
				href={links.home}
				icon={<Home color={setActive(links.home)} />}
				text='Home'
				textColor={setActive(links.home)}
			/>
			<MainNavLink
				color={theme.colors.dark[5]}
				href={links.following}
				icon={
					<MdOutlineFavorite size={20} color={setActive(links.following)} />
				}
				text='Following'
				textColor={setActive(links.following)}
			/>
			<MainNavLink
				color={theme.colors.dark[5]}
				href={links.explore}
				icon={<Compass size={20} color={setActive(links.explore)} />}
				text='Explore'
				textColor={setActive(links.explore)}
			/>
		</Group>
	)
}
export default MainNavbar
