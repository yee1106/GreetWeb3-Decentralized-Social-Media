import { GreetUser } from "@/typechain-types"
import { Button, Group, Loader, Modal,Text, TextInput } from "@mantine/core"
import { useRouter } from "next/router"
import { SetStateAction, useEffect, useState } from "react"
import { useChain, useMoralis } from "react-moralis"
import GreetUserAbi from '@/artifacts/contracts/GreetUser.sol/GreetUser.json'
import config from '@/utils/config.json'
import { ethers } from "ethers"

interface RegisterProps{
  open:boolean
}

const Register = ({open}:RegisterProps) => {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
	const [registering, setRegistering] = useState<boolean>(false)
	const [registerError, setRegisterError] = useState<boolean>(false)
	const [registerErrorMsg, setRegisterErrorMsg] = useState<string>('')
	const [opened, setOpened] = useState<boolean>(false)
	const { Moralis, web3 } = useMoralis()
	const { web3Library } = Moralis
	const { account } = useChain()

  const handleRegister = async () => {
		setRegistering(true)
		function containsWhitespace(str: string) {
			return /\s/.test(str)
		}
		setRegistering(true)
		if (containsWhitespace(userName)) {
			setRegisterError(true)
			setRegisterErrorMsg("User name can't contain whitespace")
			return
		}else if(userName===""){
			setRegisterError(true)
			setRegisterErrorMsg("User name can't be empty")
			return
		}
		try {
			let userContract = new ethers.Contract(
				config.contractAddress.User,
				GreetUserAbi.abi,
				web3?.getSigner()
			) as GreetUser
			let gasPrice = await web3?.getGasPrice()
			let estimateGas = web3Library.utils.hexlify(
				gasPrice?.mul(120).div(100) || 0
			)
			let tx = await userContract.registerNewUser(userName, {
				gasLimit: web3Library.utils.hexlify(500000),
				gasPrice: estimateGas,
			})
			await tx.wait()
			setRegisterError(false)
			setRegistering(false)
		} catch (error) {
			setRegistering(false)
			setRegisterError(true)
			setRegisterErrorMsg(error.message)
			if (error.data.message) {
				setRegisterErrorMsg(error.data.message)
			}
		}
	}

	useEffect(() => {
		let userContract = new ethers.Contract(
			config.contractAddress.User,
			GreetUserAbi.abi,
			web3?.getSigner()
		) as GreetUser
		userContract
			.isRegistered(account || '')
			.then((res) => {
				if (res === false) {
					setOpened(true)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

  return (
    <Modal
				opened={opened}
				title='Register'
				centered
				onClose={() => router.push('/')}
			>
				<>
					<Text size='sm'>Register with the user name to proceed</Text>
					<TextInput
						placeholder='User name'
						label='User name'
						required
						disabled={registering}
						error={registerError && registerErrorMsg}
						onChange={(e) => setUserName(e.target.value)}
						onFocus={() => setRegisterErrorMsg('')}
					/>
					{registering && <Loader />}
					<Group position='right'>
						<Button mt='sm' onClick={handleRegister} loading={registering}>
							Register
						</Button>
					</Group>
				</>
			</Modal>
  )
}


export default Register