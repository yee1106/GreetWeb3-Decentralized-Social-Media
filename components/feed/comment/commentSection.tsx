import {
	Box,
	Textarea,
	UnstyledButton,
	Text,
	Divider,
	ScrollArea,
	Center,
	Loader,
} from '@mantine/core'
import React, { useEffect, useRef, useState, Suspense } from 'react'
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis'
import Comment from '@/components/feed/comment/comment'
import CommentInput from './commentInput'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Moralis from 'moralis/types'
import moment from 'moment'
import { useComment } from '@/hooks/usePost'
import { useForceUpdate } from '@mantine/hooks'
import { BiErrorCircle } from 'react-icons/bi'
import { hideNotification, showNotification } from '@mantine/notifications'

interface CommentSectionProps {
	id: string
	count: number
	updateCount: () => void
	//post: Moralis.Object<Moralis.Attributes>
}

const CommentSection: React.FC<CommentSectionProps> = ({
	id,
	count,
	updateCount,
}) => {
	const [file, setFile] = useState<File | null>(null)
	const [comment, setComment] = useState('')
	//const [commentData, setCommentData] = useState<GreetComment|undefined>()
	const [preview, setPreview] = useState('')
	const { Moralis } = useMoralis()
	const { currentUser, isLoading } = useCurrentUser()
	const { save, isSaving, error } = useNewMoralisObject('GreetComment')
	const {
		comment: commentData,
		count: loadedCount,
		fetchMore,
		loading,
		hasMore,
		newCommentUpdate,
		deleteCommentUpdate,
	} = useComment({ id })
	// const commentQuery = useMoralisQuery('GreetComment', (q) =>
	// 	q
	// 		.addDescending('createdAt')
	// 		.equalTo('greet_id', post?.get('uid'))
	// 		.skip(0)
	// 		.limit(10)
	// )

	const test =
		'abrgabrgibagiuerbgifaw\nnefuabwefhbhbakdh\nbfawbefawbhbfcccccccccccccba\nehaewghvakwhkhfva\nhewvawgevfawgevfgvhbjnmkl,;gvgbhn\njmk,l;.gawvefjawejgafehkva'

	const test_comments = [test, 'test']

	const commentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (file) {
			let resolvePreview = async () => {
				let img = await toBase64(file)
				setPreview(img as string)
			}
			resolvePreview()
		}
	}, [file])

	const handleComment = async () => {
		if (!comment) {
			hideNotification('comment-error')
			showNotification({
				title: 'Error',
				id: 'comment-error',
				message: 'Empty Comment',
				autoClose: 2000,
				disallowClose: true,
				color: 'red',
				icon: <BiErrorCircle size='100%' />,
			})
			return
		}
		if (file && currentUser) {
			await save(
				{
					content: comment,
					greet_id: id,
					comment_by_user_id: currentUser.get('uid'),
					username: currentUser.get('userName'),
					image: new Moralis.File(file.name, file),
				},
				{
					onSuccess(result) {
						setPreview('')
						setFile(null)
						setComment('')
						//update()
						newCommentUpdate(result)
						updateCount()
						commentRef.current?.scrollTo({ top: 0 })
					},
				}
			)
		}
		if (currentUser && !file) {
			await save(
				{
					content: comment,
					greet_id: id,
					comment_by_user_id: currentUser.get('uid'),
					username: currentUser.get('userName'),
				},
				{
					onSuccess(result) {
						setPreview('')
						setFile(null)
						setComment('')
						newCommentUpdate(result)
						updateCount()
						commentRef.current?.scrollTo({ top: 0 })
					},
				}
			)
			//update()
		}
	}

	const fetchMoreComment = async () => {
		await fetchMore()
		//commentRef.current?.scrollTo({ top: commentRef.current?.scrollHeight })
	}

	const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		//e.preventDefault()
		setFile(null)
		// @ts-ignore: Object is possibly 'null'.
		setFile(e.target.files[0])
		e.target.value = ''
	}

	return (
		<>
			<Divider my='sm' />
			<Box my='lg' ml='xs'>
				{/*
					<Text>
						{moment(
							new Date(commentQuery.data[0]?.get('createdAt')).getTime()
						).fromNow()}
					</Text>
					{/* <Text>{JSON.stringify()}</Text> */}
				<ScrollArea.Autosize
					maxHeight={250}
					scrollbarSize={5}
					viewportRef={commentRef}
				>
					{/* <Suspense
						fallback={
							<Center>
								<Loader variant='bars' color='indigo' />
							</Center>
						}
					>
						{commentData.map((c, index) => (
							<Comment
								text={c.text}
								key={index}
								timestamp={c.timestamp}
								userName={c.userName}
								self={false}
								userId={c.userId}
								image={c.image || ''}
							/>
						))}
					</Suspense> */}

					{commentData.map((c, index) => (
						<Comment
							text={c.text}
							key={index}
							timestamp={c.timestamp}
							userName={c.userName}
							self={currentUser?.get('uid') === c.userId}
							userId={c.userId}
							image={c.image || ''}
							commentId={c.commentId}
							updateCount={updateCount}
							deleteCommentUpdate={deleteCommentUpdate}
						/>
					))}
					{loading && (
						<Center>
							<Loader variant='bars' color='indigo' />
						</Center>
					)}
					{loadedCount < count && <ViewMoreButton onClick={fetchMoreComment} />}
				</ScrollArea.Autosize>
			</Box>
			<CommentInput
				onComment={handleComment}
				onCommentChange={(e) => setComment(e.target.value)}
				onCommentFileChange={onFileChange}
				preview={preview}
				onPreviewRemove={() => {
					setFile(null)
					setPreview('')
				}}
				disabled={isSaving}
				//ref={commentRef}
			/>
		</>
	)
}

const toBase64 = (file: File) =>
	new Promise<string | ArrayBuffer | null>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

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
					textDecoration: 'underline',
				},
				color: theme.colors.indigo,
			})}
		>
			<Text size='sm'>View More</Text>
		</UnstyledButton>
	)
}

export default CommentSection
