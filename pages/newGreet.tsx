/* eslint-disable no-use-before-define */
import Page from '@/components/main/Page'
import Link from 'next/link'
import {
	Box,
	Button,
	Text,
	Card,
	Textarea,
	Group,
	useMantineTheme,
	Image,
	Center,
	LoadingOverlay,
	ActionIcon,
	Title,
	Modal,
	TextInput,
	Loader,
	Anchor,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useViewportSize } from '@mantine/hooks'
import {
	hideNotification,
	showNotification,
	updateNotification,
} from '@mantine/notifications'
import { useModals } from '@mantine/modals'
import { AiOutlineClose } from 'react-icons/ai'
import { BiImageAdd, BiErrorCircle } from 'react-icons/bi'
import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import S3 from 'aws-sdk/clients/s3'
import {
	useChain,
	useMoralis,
	useMoralisQuery,
	useWeb3ExecuteFunction,
} from 'react-moralis'
import { Greet, GreetUser } from '@/typechain-types'
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import GreetAbi from '@/artifacts/contracts/Greet.sol/Greet.json'
import config from '@/utils/config.json'
import { useCheckRegistered } from '@/hooks/useCheckRegistered'
import { useRouter } from 'next/router'
import { upload } from '@fleekhq/fleek-storage-js'
import safeFileName from 'slugify'
import useMetaTransaction from '@/hooks/useMetaTransaction'

const s3 = new S3({
	accessKeyId: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
	secretAccessKey: process.env.NEXT_PUBLIC_FLEEK_SECRET,
	region: 'us-east-1',
	endpoint: 'https://storageapi.fleek.co',
	s3ForcePathStyle: true,
})
const bucket = process.env.NEXT_PUBLIC_FLEEK_BUCKET || ''

const fleekCredential = {
	apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY || '',
	apiSecret: process.env.NEXT_PUBLIC_FLEEK_SECRET || '',
}

interface Preview {
	image: string
	file: File
}

const NewGreet = () => {
	const theme = useMantineTheme()
	const { width } = useViewportSize()
	const [text, setText] = useState<string>('')
	const [mediaURI, setMediaURI] = useState<MediaURI[]>([])
	const [mediaUploading, setMediaUploading] = useState<boolean>(false)
	const [preview, setPreview] = useState<Preview[]>([])
	const [metadataURI, setMetadataURI] = useState<string>('')
	const { web3, Moralis, user, isAuthenticated, isAuthenticating } =
		useMoralis()
	const { web3Library } = Moralis
	const { account } = useChain()
	const [modalOpened, setModalOpened] = useState<boolean>(false)
	const [txLoading, setTxLoading] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string>('')
	const gaslessTransaction = useMetaTransaction<Greet>(config.contractAddress.Greet, GreetAbi.abi)
	const { data, error, isLoading, isFetching, fetch } = useMoralisQuery(
		'NewUser',
		(q) => q.equalTo('userAddress', user?.get('ethAddress')).limit(1),
		[user?.get('ethAddress')]
	)

	let imageSize: string = useMemo(
		() => (width <= theme.breakpoints.sm ? '100px' : '160px'),
		[width, theme.breakpoints.sm]
	)
	// let isMobile: boolean = useMemo(
	// 	() => width <= theme.breakpoints.sm,
	// 	[width, theme.breakpoints.sm]
	// )

	// function timeout(ms: number) {
	// 	return new Promise((resolve) => setTimeout(resolve, ms))
	// }

	// useEffect(() => {
	// 	console.log(mediaURI)
	// }, [mediaURI])

	// useEffect(() => {
	// 	return () => {
	// 		setPreview([])
	// 		setText("")
	// 		setMediaURI([])
	// 		setMediaUploading(false)
	// 	}
	// }, [])

	// useEffect(()=>{
	// 	fetch()
	// 	console.log(isAuthenticated)
	// },[])

	const handlePublish = async () => {
		//Check text input and file
		if (!text && preview.length === 0) {
			hideNotification('empty')
			showNotification({
				id: 'empty',
				title: 'Error',
				message: 'Please upload image or fill the content',
				autoClose: 2500,
				disallowClose: true,
				color: 'red',
				icon: <BiErrorCircle size='100%' />,
			})
			return
		}

		let images: MediaURI[] | undefined

		//If there are any files, upload it to Fleek
		if (preview.length > 0) {
			images = await uploadAllMediaFile()
		}

		let greetUserName = !isLoading && !isFetching && data[0].get('userName')

		//Set the metadata of the post
		let metaData: GreetMetaData = {
			creatorName: greetUserName,
			creatorAddress: account || '',
			images: images as MediaURI[],
			text: text,
		}

		let tokenURI: string = ''

		//Upload the metadata to Fleek
		try {
			showNotification({
				id: 'uploadingMetaData',
				title: 'Uploading Greet metadata...',
				message: '',
				autoClose: false,
				disallowClose: true,
				loading: true,
			})
			let uploadMetadata = await upload({
				...fleekCredential,
				key: `metadata/${greetUserName}_${new Date()
					.getTime()
					.toString()}.json`,
				data: JSON.stringify(metaData),
				httpUploadProgressCallback: (event) => {
					updateNotification({
						id: 'uploadingMetaData',
						loading: true,
						message: `Greet uploaded: ${Math.round(
							(event.loaded / event.total) * 100
						)}%`,
					})
				},
			})
			setMetadataURI(uploadMetadata.publicUrl)
			tokenURI = uploadMetadata.publicUrl
			updateNotification({
				id: 'uploadingMetaData',
				loading: false,
				message: 'Greet uploaded',
				autoClose: 2000,
			})
		} catch (error) {
			showNotification({
				id: 'metadataError',
				title: 'Error',
				message: 'Upload failed, please try again',
				autoClose: 2500,
				disallowClose: true,
				color: 'red',
				icon: <BiErrorCircle size='100%' />,
			})
		}

		//Initialize the post smart contract
		let greetContract: Greet = new web3Library.Contract(
			config.contractAddress.Greet,
			GreetAbi.abi,
			web3?.getSigner()
		) as Greet

		//Estimate the gas price before sending the transaction
		let gasPrice = await web3?.getGasPrice()
		let estimateGas = web3Library.utils.hexlify(
			gasPrice?.mul(120).div(100) || 0
		)

		//Mint/create the post on the smart contract
			try {
				if (gaslessTransaction.ready && gaslessTransaction.contract && account) {
					setTxLoading(true)

					let tx = await greetContract.mint(1, tokenURI, {
						gasLimit: web3Library.utils.hexlify(500000),
						gasPrice: estimateGas,
					})
					// let functionData =
					// 	await gaslessTransaction.contract?.populateTransaction.mint(
					// 		1,
					// 		tokenURI
					// 	)
					// let response = await gaslessTransaction.sendMetaTransaction(
					// 	functionData,
					// 	account
					// )
					// //let txt = await
					// setTxHash(response)
					// await gaslessTransaction.waitTransaction(response)
					setTxHash(tx.hash)
					await tx.wait()
					setTxLoading(false)
					showNotification({
						title: 'Success',
						message: 'Greet Posted',
						autoClose: 2500,
						disallowClose: true,
						color: 'green',
					})
				}
			} catch (error) {
				setTxLoading(false)
				showNotification({
					title: 'Error',
					message: 'Create Greet failed, please try again',
					autoClose: 2500,
					disallowClose: true,
					color: 'red',
					icon: <BiErrorCircle size='100%' />,
				})
			}
	}

	const uploadAllMediaFile = async () => {
		try {
			setMediaUploading(true)
			showNotification({
				id: 'uploading',
				title: 'Uploading...',
				message: '',
				autoClose: false,
				disallowClose: true,
				loading: true,
			})
			const mediaUpload = await Promise.all(
				preview.map((f) => uploadMediaFile(f.file))
			)
			updateNotification({
				id: 'uploading',
				loading: false,
				message: 'All file uploaded',
				autoClose: 2000,
			})
			setMediaUploading(false)
			let mediafileurl = mediaUpload.map(
				(m) => ({ URI: m.publicUrl, IpfsHash: m.hashV0 } as MediaURI)
			)
			setMediaURI(
				mediaUpload.map(
					(m) => ({ URI: m.publicUrl, IpfsHash: m.hashV0 } as MediaURI)
				)
			)
			return new Promise<MediaURI[]>((resolve) => {
				resolve(mediafileurl)
			})
		} catch (error) {
			hideNotification('uploading')
			showNotification({
				id: 'error',
				title: 'Error',
				message: 'Upload failed, please try again',
				autoClose: 2500,
				disallowClose: true,
				color: 'red',
				icon: <BiErrorCircle size='100%' />,
			})
		}
	}

	return (
		<>
			<Modal
				opened={txLoading}
				title={<Title order={3}>Creating New Greet</Title>}
				centered
				size='lg'
				withCloseButton={true}
				onClose={() => !txLoading && setModalOpened(false)}
			>
				<>
					<Title order={4}>Transaction Hash :</Title>
					<Anchor
						href={`https://mumbai.polygonscan.com/tx/${txHash}`}
						target='_blank'
						rel='noreferrer'
					>
						{txHash}
					</Anchor>
					<Box mt='sm'>{txLoading && <Loader />}</Box>
				</>
			</Modal>

			<Card
				p='lg'
				style={{
					backgroundColor: theme.colors.dark[9],
					border: '1px solid',
					borderColor: theme.colors.gray[7],
					height: '100%',
				}}
			>
				<Title order={2} mb='sm'>
					Publish a Greet
				</Title>
				<Link href='/' passHref>
					<Button variant='outline'>Back</Button>
				</Link>

				<Text my='sm' weight='bold'>
					Add images {preview.length}/100
				</Text>

				<Group mt='sm'>
					{preview.map((p, i) => (
						<Box
							key={i}
							sx={{
								width: imageSize,
								height: imageSize,
							}}
							style={{ position: 'relative' }}
						>
							<LoadingOverlay visible={mediaUploading} />
							<Group position='right'>
								<ActionIcon
									color='red'
									size='lg'
									radius='xl'
									variant='filled'
									disabled={mediaUploading}
									style={{ position: 'absolute', zIndex: 1 }}
									onClick={() => {
										setPreview(preview.filter((prev) => prev != p))
									}}
								>
									<AiOutlineClose size='50%' />
								</ActionIcon>
							</Group>

							<Image
								src={p.image}
								alt='image'
								width={imageSize}
								height={imageSize}
								sx={{
									display: 'block',
								}}
							/>
							<Text
								size='sm'
								style={{
									width: imageSize,
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{p.file.name}
							</Text>
						</Box>
					))}

					<Dropzone
						onDrop={async (files) => {
							let imgs = await Promise.all(files.map((f) => toBase64(f)))
							let previews: Preview[] = files.map((f, i) => ({
								file: f,
								image: imgs[i] as string,
							}))
							setPreview((p) => [...p, ...previews])
						}}
						onReject={(files) => console.log('rejected files', files)}
						accept={[...IMAGE_MIME_TYPE]}
						disabled={mediaUploading}
						style={{
							width: imageSize,
							height: imageSize,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						{(status) => (
							<Center>
								<BiImageAdd size={'80%'} />
							</Center>
						)}
					</Dropzone>
				</Group>
				<Box mt='lg'>
					<Textarea
						placeholder='Please Enter Text'
						label='Content'
						autosize={true}
						minRows={8}
						variant='default'
						onChange={(e) => setText(e.target.value)}
						pt='xl'
					/>
				</Box>
				<Group mt='40px' position='center' style={{ position: 'relative' }}>
					<Button
						size='lg'
						onClick={handlePublish}
						loading={mediaUploading || txLoading}
					>
						Publish
					</Button>
				</Group>
			</Card>
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

const uploadMediaFile = async (file: File) => {
	return upload({
		...fleekCredential,

		key: `mediaFile/${new Date().getTime().toString()}${safeFileName(
			file.name,
			{ remove: /"<>#%\{\}\|\\\^~\[\]`;\?:@=&/g }
		).toLowerCase()}`,

		data: file,

		httpUploadProgressCallback: (event) => {
			let progress = Math.round((event.loaded / event.total) * 100)
			updateNotification({
				id: 'uploading',
				message: `${file.name} uploaded ${progress}%`,
			})
		},
	})
}
export default NewGreet
