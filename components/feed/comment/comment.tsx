import {
	Avatar,
	Box,
	createStyles,
	Group,
	useMantineTheme,
	Text,
	Spoiler,
} from '@mantine/core'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'

const Comment = ({text}:{text:string}) => {
	const theme = useMantineTheme()
	const { classes } = useStyles()
	return (
		<Box my='md'>
			<Group position='left' spacing={'xs'} align='flex-start' my='xs'>
				<Link href='/' passHref>
					<Avatar
						radius='lg'
						color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
						size={40}
						src=''
					>
						<CgProfile size={'100%'} />
					</Avatar>
				</Link>
				<Box className={classes.comment} p='sm'>
					<Spoiler maxHeight={100} hideLabel={'Hide'} showLabel={'Show more'} styles={{
						control:{
							color:theme.colors.indigo,
							fontSize:theme.fontSizes.sm
						}
					}}>
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
				</Box>
			</Group>
		</Box>
	)
}

const useStyles = createStyles((theme) => {
	return {
		comment: {
			backgroundColor: theme.colorScheme === 'dark' ?  theme.colors.dark[4] : theme.colors.gray[1],
			borderRadius: theme.radius.md,
			maxWidth: '80%',
		},
	}
})

export default Comment
