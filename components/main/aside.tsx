import { nonHomePagePath } from '@/utils/constants/constants'
import {
	MediaQuery,
	Aside as Side,
	Group,
	Box,
	createStyles,
	Text,
} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { useRouter } from 'next/router'

const Aside = () => {
	const { classes } = useStyles()
	return (
		<MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
			<Side
				p='md'
				hiddenBreakpoint='sm'
				width={{ sm: 150, lg: 300, md: 150, xl: 300, xxl: 500 }}
				mt='lg'
				className={classes.aside}
			>
				<Group position='center' style={{ width: '100%' }}>
					<Box
						style={{
							width: '100%',
						}}
						p='md'
					>
						<Group position='center'>
							<Text size='sm'>Following suggestion</Text>
						</Group>
					</Box>
				</Group>
			</Side>
		</MediaQuery>
	)
}
const useStyles = createStyles((theme) => {
	const router = useRouter()
	const { width } = useViewportSize()
	return {
		aside: {
			background: theme.colorScheme === 'dark' ? theme.black : theme.white,
			height: '100%',
			display:
				nonHomePagePath.includes(router.pathname) ||
				width <= theme.breakpoints.sm
					? 'none'
					: 'block',
			border: 'none',
		},
	}
})

export default Aside
