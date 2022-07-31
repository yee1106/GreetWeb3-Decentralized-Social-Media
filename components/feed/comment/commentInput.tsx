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
	FileButton,
	AspectRatio,
} from '@mantine/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BiImageAdd, BiSend } from 'react-icons/bi'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'

interface CommentInputProps {
	onComment?: React.MouseEventHandler<HTMLButtonElement>
	onCommentChange?: React.ChangeEventHandler<HTMLTextAreaElement>
	onCommentFileChange?: React.ChangeEventHandler<HTMLInputElement>
	onPreviewRemove?:React.MouseEventHandler<HTMLButtonElement>
	preview?:string
	disabled:boolean
	//ref: React.Ref<HTMLTextAreaElement>
}

const CommentInput: React.FC<CommentInputProps> = ({ onComment,onCommentChange,onCommentFileChange, onPreviewRemove,preview, disabled }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { classes } = useStyles()


	const handleImageUpload = () => {
		inputRef.current?.click()
	}
	// const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
	// 	//e.preventDefault()
	// 	setFile(null)
	// 	// @ts-ignore: Object is possibly 'null'.
	// 	setFile(e.target.files[0])
	// 	e.target.value = ''
	// }

	return (
		<Box className={classes.container}>
			{/* {preview && (<Image src={preview} alt="comment" layout='fill'/>)} */}
			{preview && (
				<Box
					sx={{
						width: 100,
						height: 100,
					}}
					style={{ position: 'relative' }}
					ml='sm'
				>
					<Group position='right'>
						<ActionIcon
							color='red'
							size='lg'
							radius='xl'
							variant='filled'
							disabled={disabled}
							style={{ position: 'absolute', zIndex: 1 }}
							onClick={onPreviewRemove}
						>
							<AiOutlineClose size='50%' />
						</ActionIcon>
					</Group>
					<Image
						src={preview}
						alt='comment'
						style={{
							display: 'block',
						}}
						width={100}
						height={100}
						//layout='fill'
					/>
				</Box>
			)}

			<Group mt='sm' position='center' align='center' className={classes.group}>
				<Textarea
					placeholder='Comment'
					radius='md'
					size='xs'
					className={classes.input}
					onChange={onCommentChange}
					//ref={ref}
				/>
				<ActionIcon onClick={handleImageUpload} disabled={disabled}>
					<BiImageAdd size={'100%'} />
				</ActionIcon>
				<ActionIcon onClick={onComment} loading={disabled}>
					<BiSend size={'100%'} />
				</ActionIcon>
				{/* <FileButton onChange={setFile}>
					{(props) => (
						<ActionIcon {...props}>
							<BiImageAdd size={'100%'} />
						</ActionIcon>
					)}
				</FileButton> */}
				<input
					type='file'
					hidden={true}
					ref={inputRef}
					accept='image/*'
					onChange={onCommentFileChange}
				/>
			</Group>
		</Box>
	)
}

const toBase64 = (file: File) =>
	new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

const useStyles = createStyles((theme) => {
	return {
		container: {
			width: '100%',
		},
		group: {
			width: '100%',
		},
		input: {
			width: '80%',
		},
	}
})

export default CommentInput
