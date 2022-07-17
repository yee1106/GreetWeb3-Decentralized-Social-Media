import { useCallback, useEffect, useMemo, useState } from 'react'
import FeedList from '@/components/feed/feedList'
import Page from '@/components/main/Page'
import { useDidUpdate, useViewportSize, useWindowScroll } from '@mantine/hooks'
import { observer } from 'mobx-react-lite'
import store from '@/store/store'
import { Button, ScrollArea, SegmentedControl, Box, Tabs, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { FeedFilter } from '@/utils/constants/constants'
import SwipeView from 'react-swipeable-views'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import axios, { AxiosResponse } from 'axios'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import { useCheckRegistered } from '@/hooks/useCheckRegistered'
import { useScrollRestore } from '@/hooks/useScrollRestore'
import { usePost, usePostV2 } from '@/hooks/usePost'


//import { heights } from '@mantine/core/lib/components/Badge/Badge.styles'

const Index = () => {

	const router = useRouter()
	let {feed : post,fetchMore,hasMore} = usePostV2()
	useScrollRestoration(router)

	const images = ['https://picsum.photos/id/1018/1000/600/']

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
				feeds={post}
				filter={FeedFilter.Trending}
				isFollowing={false}
				hasMore={hasMore}
				fetchMore={fetchMore}
			/>
		</>
	)
}

export default observer(Index)
