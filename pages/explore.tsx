import FeedList from '@/components/feed/feedList'
import Page from '@/components/main/Page'
import {
	ActionIcon,
	Box,
	Button,
	Group,
	SegmentedControl,
	TextInput,
	Text,
	Avatar,
	Title,
	Card,
	useMantineTheme,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { useMoralis, useMoralisQuery } from 'react-moralis'
//import { heights } from '@mantine/core/lib/components/Badge/Badge.styles'

const Explore = () => {
	const [value, setValue] = useState('greet')
	const [text, setText] = useState<string>('')
	const [debouncedText] = useDebouncedValue(text, 200)
	const theme = useMantineTheme()
	const { Moralis } = useMoralis()
	const { data, error, isLoading, isFetching, fetch } = useMoralisQuery(
		'NewUser',
		(q) => q.matches('userName', new RegExp(`${debouncedText}`), 'i').limit(10),
		[debouncedText],
		{
			live: true,
		}
	)
	// const { data, error, isLoading, isFetching, fetch } = useMoralisQuery(
	// 	'NewUser',
	// 	(q) =>
	// 		Moralis.Query.or(
	// 			q.matches('userName', new RegExp(`${debouncedText}`), 'i'),
	// 			q.matches('userAddress', new RegExp(`${debouncedText}`,'i'))
	// 		).limit(10),
	// 	[debouncedText],
		
	// )
	//Moralis.Query.or()

	return (
		<>
			<Link href='/' passHref>
				<Button variant='outline'>Back</Button>
			</Link>
			<Box mt='sm'>
				<TextInput
					placeholder='search by user name'
					label='Search'
					onChange={(e) => setText(e.target.value)}
				/>
			</Box>
			{debouncedText && (
				<Group position='apart' align='center' mb='sm' mt='sm'>
					<Text size='lg' weight='bold' align='center'>
						Profile
					</Text>
				</Group>
			)}
			{debouncedText &&
				data.map((d, i) => (
					<Card
						p='lg'
						key={i}
						style={{
							backgroundColor: theme.colors.dark[9],
							border: '1px solid',
							borderColor: theme.colors.gray[7],
						}}
						radius='lg'
						mt='sm'
					>
						<Link href={`/profile/${d?.get('uid')}`} passHref>
							<Group
								position='left'
								align='center'
								style={{ cursor: 'pointer' }}
							>
								<Avatar
									radius='lg'
									color='dark'
									mb='sm'
									size={40}
									src={d?.get('profile_pic')?.url()}
								>
									<CgProfile size={'100%'} />
								</Avatar>
								<Group direction='column'>
									<Title order={5} style={{ color: 'white' }}>
										{d.get('userName')}
									</Title>
									<Text>
										Address:<Text color='white'>{d?.get('userAddress')}</Text>
									</Text>
								</Group>
							</Group>
						</Link>
					</Card>
				))}
		</>
	)
}
export default Explore
