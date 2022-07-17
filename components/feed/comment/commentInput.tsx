import {
	ActionIcon,
	Box,
	Center,
	Group,
	Textarea,
	Grid,
	createStyles,
	useMantineTheme,
	BackgroundImage,
} from '@mantine/core'
import { useRef } from 'react'
import { BiImageAdd } from 'react-icons/bi'

const CommentInput = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { classes } = useStyles()
	const handleImageUpload = () => {
		inputRef.current?.click()
	}
	return (
		<Box className={classes.container}>
			<Group mt='sm' position='center' align='center' className={classes.group}>
				<Textarea
					placeholder='Comment'
					radius='md'
					size='xs'
					className={classes.input}
				/>
				<ActionIcon onClick={handleImageUpload}>
					<BiImageAdd size={'100%'} />
				</ActionIcon>
				<input type='file' hidden={true} ref={inputRef} accept='image/*' />
			</Group>
		</Box>
	)
}

const useStyles = createStyles((theme) => {
	return {
		container: {
			width: '100%',
		},
		group:{
			width:"100%"
		},
		input:{
			width:"90%",
		}
	}
})

export default CommentInput
