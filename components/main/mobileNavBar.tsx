import {
	MediaQuery,
	Footer,
	Group,
	ActionIcon,
	Avatar,
	Indicator,
	useMantineTheme,
} from '@mantine/core'
import { Home, Compass, Plus, Bell } from 'tabler-icons-react'
import { CgProfile } from 'react-icons/cg'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

interface MobileNavBarProps {
	profileId: string
	image: string
}

const MobileNavBar = ({ profileId, image }: MobileNavBarProps) => {
	const theme = useMantineTheme()
	const router = useRouter()
	let setActive = (route: string) =>
		router.pathname === route
			? theme.colors.indigo[7]
			: theme.colorScheme === 'dark'
			? theme.colors.dark[0]
			: theme.black
	return (
		<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
			<Footer
				height={55}
				p='md'
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === 'dark' ? theme.black : theme.white,
				})}
			>
				<Group position='apart' style={{ width: '100%' }}>
					<NavItem link={links.home} icon={<Home size='100%' color={setActive(links.home)} />} />
					<NavItem link={links.explore} icon={<Compass size='100%' color={setActive(links.explore)}/>} />
					<NavItem link={links.add} icon={<Plus size='100%' />} />
					<Indicator
						disabled={false}
						offset={5}
						size={16}
						label={0}
						color='red'
					>
						<NavItem link={links.notification} icon={<Bell size='100%' color={setActive(links.notification)} />} />
					</Indicator>
					<NavItem
						link={`${links.profile}?id=${profileId}`}
						icon={
							<Avatar src={image} size='sm'>
								<CgProfile size='100%' />
							</Avatar>
						}
					/>
				</Group>
			</Footer>
		</MediaQuery>
	)
}

interface NavItemprops {
	link: string | UrlObject
	icon: React.ReactElement
}

const NavItem = ({ link, icon }: NavItemprops) => {
	return (
		<Link href={link} passHref>
			<ActionIcon>{icon}</ActionIcon>
		</Link>
	)
}

const links = {
	home: '/',
	explore: '/explore',
	add: '/newGreet',
	notification: '/notifications',
	profile: '/profile',
}

export default MobileNavBar
