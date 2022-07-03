import Page from '@/components/main/Page'
import Link from 'next/link'
import {
	ActionIcon,
	Avatar,
	Box,
	Button,
	Card,
	Center,
	Group,
	Text,
	TextInput,
	Title,
	useMantineTheme,
} from '@mantine/core'
import { AiOutlineSetting } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { BiImageAdd } from 'react-icons/bi'
import { useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'

interface Preview {
	image: string
	file: File | undefined
}

const Setting = () => {
	const theme = useMantineTheme()
	const router = useRouter()
	const {
		Moralis,
		user,
		setUserData,
		isUserUpdating,
		isInitialized,
		refetchUserData,
	} = useMoralis()
	const [preview, setPreview] = useState<Preview>({
		image: '',
		file: undefined,
	})
	const [loading,setLoading] = useState<boolean>(false)
	const [description, setDescription] = useState<string>('')
	const { data, error, isLoading, isFetching, fetch } = useMoralisQuery(
		'NewUser',
		(q) => q.equalTo('userAddress', user?.get('ethAddress')).limit(1),
		[user?.get('ethAddress')],
		{
			live: true,
		}
	)

	return (
		<>
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
						Setting
					</Text>
				</Group>
				<Group position='center' align='flex-start'>
					<Group position='center' direction='column'>
						<Avatar
							radius='lg'
							color='dark'
							mb='sm'
							src={preview.image || data[0]?.get('profile_pic')?.url()}
							size={80}
						>
							<CgProfile size={'100%'} />
						</Avatar>
						<Title order={5}>{data[0]?.get('userName')}</Title>
						<Text size='sm'>
							{data[0]?.get('description') || 'Default description'}
						</Text>
					</Group>
				</Group>
				<Group position='center' mt='sm'>
					<TextInput
						placeholder=''
						label='Set Description'
						required
						onChange={(e) => setDescription(e.target.value)}
						//defaultValue={data[0]?.get('description') || 'Default description'}
						disabled={loading}
					/>
				</Group>

				<Group position='center' mt='sm'>
					<Dropzone
						onDrop={async (files) => {
							let img = await toBase64(files[0])
							setPreview({
								image: img as string,
								file: files[0],
							})
						}}
						onReject={(files) => console.log('rejected files', files)}
						accept={[...IMAGE_MIME_TYPE]}
						//disabled={mediaUploading}
						style={{
							height: '80px',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						{(status) => (
							<Center>
								<BiImageAdd size={'80%'} />
								Upload the new profile picture
							</Center>
						)}
					</Dropzone>
				</Group>
				<Group position='center' mt='sm'>
					<Button
						variant='outline'
						loading={loading}
						onClick={async () => {
							if (isInitialized) {
								setLoading(true)
								data[0]?.set("description",description)
								await data[0]?.save()
								if (preview.file !== undefined) {
									let image = new Moralis.File(preview.file.name, preview.file)
									data[0]?.set('profile_pic', image)
									await data[0]?.save()
								}
								showNotification({
									title: 'Success',
									message: 'User data updated',
									autoClose: 2500,
									disallowClose: true,
									color: 'green',
								})
								//refetchUserData()
                setPreview({
                  image:"",
                  file:undefined
                })
								setLoading(false)
							}
						}}
					>
						Save
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

export default Setting
