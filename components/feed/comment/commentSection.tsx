import { Box, Textarea, UnstyledButton, Text, Divider } from '@mantine/core'
import Comment from '@/components/feed/comment/comment'
import { useState } from 'react'
import CommentInput from './commentInput'

const CommentSection = () => {
	const test = "abrgabrgibagiuerbgifaw\nnefuabwefhbhbakdh\nbfawbefawbhbfcccccccccccccba\nehaewghvakwhkhfva\nhewvawgevfawgevfgvhbjnmkl,;gvgbhn\njmk,l;.gawvefjawejgafehkva"
	return (
		<>
			<Divider my='sm' />
			<Box my='lg' ml='xs'>
				<Comment text={test} />
				<Comment text='test' />
				<ViewMoreButton />
			</Box>
			<CommentInput />
		</>
	)
}

const ViewMoreButton = ({
	onClick,
}: {
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => {
	return (
		<UnstyledButton
			m='0'
			onClick={onClick}
			sx={(theme) => ({
				':hover': {
					
					textDecoration:"underline"
				},
				color: theme.colors.indigo,
			})}
		>
			<Text size='sm'>View More</Text>
		</UnstyledButton>
	)
}

export default CommentSection
