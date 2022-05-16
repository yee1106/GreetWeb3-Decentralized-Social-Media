import { useEffect, useMemo, useState } from 'react'
import FeedList from '@/components/feed/feedList'
import Page from '@/components/main/Page'
import { useViewportSize, useWindowScroll } from '@mantine/hooks'
import { observer } from 'mobx-react-lite'
import store from '@/store/user'
import { Button, ScrollArea, SegmentedControl, Box, Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { FeedFilter } from '@/utils/constants/constants'
import SwipeView from 'react-swipeable-views'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import axios, { AxiosResponse } from 'axios'

//import { heights } from '@mantine/core/lib/components/Badge/Badge.styles'

const Index = observer(() => {
	const { height } = useViewportSize()

	const router = useRouter()

	const [scroll, scrollTo] = useWindowScroll()

	const [activeTab, setActiveTab] = useState(0)

	const [feeds, setFeeds] = useState<Feed[]>()

	const { Moralis, isInitialized } = useMoralis()

	const { data } = useMoralisQuery('NewGreet', (q) =>
		q.descending('timestamp_decimal').notEqualTo('uri', '').limit(10)
	)
	//const [position, setPosition] = useState<number>(0)

	// useEffect(() => {
	// 	if(scroll.y>0){
	// 		userStore.setFeedScrollPosition(scroll.y)
	// 		//setPosition(scroll.y)
	// 	}
	// }, [scroll.y])

	// useEffect(()=>{
	// 	window.scrollTo(0,userStore.feedScrollPosition)
	// },[])

	// let greetMetadata:Feed[] = useMemo(async()=>{
	// 	let allData = await Promise.all(data.map(d=>{
	// 		return axios.get(d.get("uri"))
	// 	}))
	// 	let formattedData = allData.map(d=>(d.data))
	// 	return formattedData.map(f=>({

	// 	}))
	// },[data])

	

	useEffect(() => {
		console.log(data)
		fetchAllMetaData()
	}, [data])

	const fetchAllMetaData = async () => {
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
	}

	// let fetchGreetMetaData = async ()=>{
	// 	let {data} = await axios.get("https://storageapi.fleek.co/47853140-618b-400c-89ef-dcc3f3fabfdb-bucket/metadata/YC1106_1650381559529.json")
	// 	console.log(data);
	// }

	//const images: string[] = ['https://picsum.photos/id/1018/1000/600/']

	// let feeds: Feed[] = [
	// 	{
	// 		userName: 'YC',
	// 		id: '1',
	// 		timestamp: 'timestamp',
	// 		textContent: 'test',
	// 		images: images,
	// 	},
	// 	{
	// 		userName: 'YC',
	// 		id: '2',
	// 		timestamp: 'timestamp',
	// 		textContent: 'test',
	// 		images: images,
	// 	},
	// ]

	return (
		<Page title='test' homePage={true}>
			<FeedList
				feeds={feeds ? feeds : []}
				filter={FeedFilter.Trending}
				isFollowing={false}
			/>
		</Page>
	)
})

export default Index
