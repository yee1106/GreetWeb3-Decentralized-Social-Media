import Moralis from "moralis/types"
import { useCallback, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"

export function useSearchUserById(id:string | string[] | undefined){

  const [userName, setUserName] = useState<string>('')
	const [greetCount, setGreetCount] = useState<number>(0)
	const [self, setSelf] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
	const { Moralis, isInitialized, isInitializing, user, isAuthenticating } =
		useMoralis()
	const [userByid, setUserById] = useState<
		Moralis.Object<Moralis.Attributes> | undefined
	>(undefined)


  let getUserData = useCallback(async () => {
		if (isInitialized) {
			setLoading(true)
			let userNameQuery = new Moralis.Query('NewUser')
			let searchedUser = await userNameQuery.equalTo('uid', id).first()
			setUserName(searchedUser?.get('userName'))
			setUserById(searchedUser)
			let greetCountQuery = new Moralis.Query('NewGreet')
			let greetCount = await greetCountQuery
				.equalTo('creator', searchedUser?.get('userAddress'))
				.notEqualTo('uri', '')
				.count()
			setGreetCount(greetCount)
			let isSelf = user?.get('ethAddress') === searchedUser?.get('userAddress')
			setSelf(isSelf)
			setLoading(false)
		}
	}, [isInitialized, Moralis.Query, id, user])

	useEffect(() => {
		getUserData()
	}, [user, getUserData])



  return{
    result:userByid,
    greetCount,
    self,
    userName,
    loading
  }
}