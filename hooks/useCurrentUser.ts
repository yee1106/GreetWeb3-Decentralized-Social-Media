import { useMoralis, useMoralisQuery } from 'react-moralis'
import {useEffect} from 'react'

export function useCurrentUser() {
	const { user, isAuthenticated, isInitialized } = useMoralis()
	const {
		data: currentUser,
		isLoading,
		error,
	} = useMoralisQuery(
		'NewUser',
		(q) => q.equalTo('userAddress', user?.get('ethAddress')).limit(1),
		[]
	)
	return {
		currentUser:currentUser[0],
		isLoading,
		error,
	}
}
