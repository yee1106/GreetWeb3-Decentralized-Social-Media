import { MediaQuery, Footer, Group, ActionIcon, Avatar } from '@mantine/core'
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
	return (
		<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
			<Footer height={55} p='md' style={{ backgroundColor: '#000000' }}>
				<Group position='apart' style={{ width: '100%' }}>
					<NavItem link={links.home} icon={<Home size='100%' />} />
					<NavItem link={links.explore} icon={<Compass size='100%' />} />
					<NavItem link={links.add} icon={<Plus size='100%' />} />
					<NavItem link={links.notification} icon={<Bell size='100%' />} />
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
