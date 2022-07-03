import { useCallback, useEffect, useMemo, useState } from 'react'
import FeedList from '@/components/feed/feedList'
import Page from '@/components/main/Page'
import { useDidUpdate, useViewportSize, useWindowScroll } from '@mantine/hooks'
import { observer } from 'mobx-react-lite'
import store from '@/store/user'
import { Button, ScrollArea, SegmentedControl, Box, Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { FeedFilter } from '@/utils/constants/constants'
import SwipeView from 'react-swipeable-views'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import axios, { AxiosResponse } from 'axios'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { useCheckRegistered } from '@/hooks/useCheckRegistered'

//import { heights } from '@mantine/core/lib/components/Badge/Badge.styles'

const Index = () => {
	const router = useRouter()

	useScrollRestoration(router)
	const [feeds, setFeeds] = useState<Feed[]>()

	const { Moralis, isInitialized } = useMoralis()

	const [page, setPage] = useState<number>(1)

	const [objectid, setObjectId] = useState<string>('')

	// const isRegistered = useCheckRegistered()

	const pageSize = 10

	const { data } = useMoralisQuery(
		'NewGreet',
		(q) =>
			q.descending('timestamp_decimal').notEqualTo('uri', '').limit(pageSize),
		[],
	)

	const feed = useMoralisQuery('NewGreet', (q) =>
		q
			.descending('timestamp_decimal')
			.notEqualTo('uri', '')
			.greaterThan('objectid', objectid)
			.limit(pageSize)
	)

	const fetchAllMetaData = useCallback(async () => {
		let allData = await Promise.all(
			data.map((d) => {
				return axios.get<GreetMetaData>(d.get('uri'))
			})
		)
		let id = data.map((d) => d.get('uid') as string)
		let timestamp = data.map((d) => d.get('timestamp') as string)

		let formattedData: Feed[] = allData.map(({ data }, i) => ({
			userName: data.creatorName,
			id: id[i],
			images: data.images?.map((i) => i.URI),
			textContent: data.text,
			timestamp: timestamp[i],
		}))
		setFeeds(formattedData)
	}, [data])

	useEffect(() => {
		console.log(data)
		fetchAllMetaData()
		return(()=>{
			setFeeds([])
		})
	}, [data, fetchAllMetaData])

	// let fetchGreetMetaData = async ()=>{
	// 	let {data} = await axios.get("https://storageapi.fleek.co/47853140-618b-400c-89ef-dcc3f3fabfdb-bucket/metadata/YC1106_1650381559529.json")
	// 	console.log(data);
	// }

	// useDidUpdate(()=>{
	// 	isRegistered ? alert("registered") : alert("Not registered")
	// },[isRegistered])

	

	const images: string[] = ['https://picsum.photos/id/1018/1000/600/']

	let testfeeds: Feed[] = [
		{
			userName: 'YC',
			id: '1',
			timestamp: 'timestamp',
			textContent: 'test',
			images: images,
		},
		{
			userName: 'YC',
			id: '2',
			timestamp: 'timestamp',
			textContent: 'test',
			images: images,
		},
	]

	return (
		<>
			<FeedList
				feeds={feeds || []}
				filter={FeedFilter.Trending}
				isFollowing={false}
				hasMore={false}
				fetchMore={() => {}}
			/>
		</>
	)
}

export default observer(Index)
