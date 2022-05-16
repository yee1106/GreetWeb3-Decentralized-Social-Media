import Page from '@/components/main/Page'
import { ReactElement } from 'react'
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

const Profile = () => {
	const theme = useMantineTheme()
	return (
		<Page title={'test'} homePage={false}>
			<Link href='/' passHref>
				<Button variant='outline'>Back</Button>
			</Link>

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
					<Link href='/profile/setting' passHref>
						<ActionIcon mr='sm' size='xl'>
							<AiOutlineSetting size={30} />
						</ActionIcon>
					</Link>
				</Group>
				<Group position='center' align='flex-start'>
					<Box>
						<Avatar radius='lg' color='dark' mb='sm' size={80}>
							<CgProfile size={'100%'} />
						</Avatar>
						<Title order={5}>UserName</Title>
						<Text size='sm'>Description</Text>
					</Box>
				</Group>
				<Group position='center' mt='md'>
					<Box>
						<Text size='sm' weight='bold' align='center'>
							0
						</Text>
						<Text size='sm' align='center'>
							Greets
						</Text>
					</Box>
					<Box>
						<Text size='sm' weight='bold' align='center'>
							0
						</Text>
						<Text size='sm' align='center'>
							Followers
						</Text>
					</Box>
					<Box>
						<Text size='sm' weight='bold' align='center'>
							0
						</Text>
						<Text size='sm' align='center'>
							Following
						</Text>
					</Box>
					<Box>
						<Text size='sm' weight='bold' align='center'>
							0
						</Text>
						<Text size='sm' align='center'>
							Like
						</Text>
					</Box>
				</Group>
			</Card>
		</Page>
	)
}

export default Profile
