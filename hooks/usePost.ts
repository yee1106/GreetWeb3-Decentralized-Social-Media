import keyValueStore, { KeyValueStore } from './../store/keyValueStore';
import { useEffect, useState } from 'react'
import {useMoralis, useMoralisQuery} from "react-moralis"
import {} from "mobx"
import { observer } from 'mobx-react-lite'

interface UsePostConfig{
  userId?:string,
  latest?:boolean
  trending?:boolean
}

export function usePost(config?:UsePostConfig) {

  const [page,setPage] = useState(0)

  // const { data } = useMoralisQuery(
	// 	'NewGreet',
	// 	(q) =>
	// 		q.descending('timestamp_decimal').notEqualTo('uri', '').skip(page-1).limit(5),
	// 	[]
	// )

  const fetchMore = async()=>{
    setPage(p=>p+1)
  }


  return{
    fetchMore
  }
}


