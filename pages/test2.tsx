import { Query } from '@/graphql/cyberConnect'
import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import {UserIdentity} from "@/graphql/generated"



const Test2 = () => {
	const { user } = useMoralis()
	const test = useQuery<Query>(gql`
		query IdentityQuery($address: String!) {
			identity(
				address: $address
				network: ETH
			) {
				address
			}
		}
	`,{
    variables:{
      address:user?.get("ethAddress")
    }
  })

	useEffect(() => {
		console.log(test.data)
	}, [test.data])

	//@ts-ignore
	return <>{!test.loading && <div>{test.data?.identity.address}</div>}</>
}
export default Test2
