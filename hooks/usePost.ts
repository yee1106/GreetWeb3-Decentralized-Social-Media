import { useSearchUserById } from '@/hooks/useSearchUserById'
import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import axios from 'axios'
import MainFeedStore from '@/store/feed/mainFeed'
import UserFeedStore from '@/store/feed/userFeedStore'
import Moralis from 'moralis/types'
import { useDidUpdate } from '@mantine/hooks'

interface UsePostConfig {
	userId?: string | string[] | undefined
	latest?: boolean
	trending?: boolean
}

export function usePost(config?: UsePostConfig) {
	const pageSize = 5
	const { Moralis, isInitialized } = useMoralis()
	const [loading, setLoading] = useState(true)

	const fetchPost = async () => {
		if (isInitialized) {
			const postQuery = new Moralis.Query('NewGreet')
			postQuery
				.descending('timestamp_decimal')
				.notEqualTo('uri', '')
				.skip(MainFeedStore.getSkip * pageSize)
				.limit(pageSize)
			let post = await postQuery.find()
			return post
		}
	}

	const fetchMore = async () => {
		//MainFeedStore.setPage(1)
		MainFeedStore.getPage() === 1 && MainFeedStore.addPage()
		let post = await fetchPost()
		if (post?.length === 0 || !post) {
			MainFeedStore.setHasMore(false)
			return
		}
		let formatted = await getFormattedFeed(post || [])
		formatted.length !== 0 && MainFeedStore.addLoadedFeed(formatted)
		//setPage(p=>p+1)
		MainFeedStore.addPage()
	}

	const initialPost = async () => {
		setLoading(true)
		let post = await fetchPost()
		let formatted = await getFormattedFeed(post || [])
		formatted.length !== 0 && MainFeedStore.addLoadedFeed(formatted)
		setLoading(false)
		//setPage(p=>p+1)
	}

	useEffect(() => {
		//MainFeedStore.clearloadedFeed()
		isInitialized && initialPost()
	}, [isInitialized])

	return {
		fetchMore: fetchMore,
		feed: MainFeedStore.feeds,
		count: MainFeedStore.feeds.length,
		hasMore: MainFeedStore.hasMore,
		loading,
	}
}

export function usePostV2(config?: UsePostConfig) {
	const pageSize = 5
	const { Moralis, isInitialized } = useMoralis()
	const [loading, setLoading] = useState(true)

	const fetchPost = async () => {
		if (isInitialized) {
			const postQuery = new Moralis.Query('NewGreet')
			postQuery
				.descending('timestamp_decimal')
				.notEqualTo('uri', '')
				.lessThan(
					'timestamp_decimal',
					parseInt(MainFeedStore.feeds.at(-1)?.timestamp as string)
				)
				.limit(pageSize + 1)
			let post = await postQuery.find()
			//alert(JSON.stringify(post.length))
			return post
		}
	}

	const fetchFirstPage = async () => {
		if (isInitialized) {
			const postQuery = new Moralis.Query('NewGreet')
			postQuery
				.descending('timestamp_decimal')
				.notEqualTo('uri', '')
				.limit(pageSize + 1)
			let post = await postQuery.find()
			return post
		}
	}

	const fetchMore = async () => {
		//MainFeedStore.setPage(1)
		MainFeedStore.getPage() === 1 && MainFeedStore.addPage()
		let post = await fetchPost()
		//alert(post?.at(-1)?.get("uid"))
		if (post) {
			if (post.length > pageSize) {
				let next = post?.pop()
				MainFeedStore.setNext(next?.get<string>('timestamp'))
			} else {
				MainFeedStore.setHasMore(false)
			}
		} else {
			MainFeedStore.setHasMore(false)
			return
		}
		let formatted = await getFormattedFeed(post || [])
		formatted.length !== 0 && MainFeedStore.addLoadedFeed(formatted)
		//setPage(p=>p+1)
		MainFeedStore.addPage()
	}

	const initialPost = async () => {
		setLoading(true)
		let post = await fetchFirstPage()
		if (post) {
			if (post.length >= pageSize) {
				let next = post?.pop()
				MainFeedStore.setNext(next?.get<string>('timestamp'))
			} else {
				MainFeedStore.setHasMore(false)
			}
		} else {
			MainFeedStore.setHasMore(false)
			return
		}
		let formatted = await getFormattedFeed(post || [])
		formatted.length !== 0 && MainFeedStore.addLoadedFeed(formatted)
		setLoading(false)
		//setPage(p=>p+1)
	}

	useEffect(() => {
		//MainFeedStore.clearloadedFeed()
		isInitialized && MainFeedStore.feeds.length === 0 && initialPost()
	}, [isInitialized])

	return {
		fetchMore: fetchMore,
		feed: MainFeedStore.feeds,
		count: MainFeedStore.feeds.length,
		hasMore: MainFeedStore.hasMore,
		loading,
	}
}

export function usePostFromUser(config?: UsePostConfig) {
	const pageSize = 5
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	const [feed, setFeed] = useState<Feed[]>([])
	const { Moralis, isInitialized } = useMoralis()
	let {
		result: userByid,
		userName,
		greetCount,
		self,
		loading,
	} = useSearchUserById(config?.userId)

	let checkLoading = useCallback(
		() =>
			new Promise<void>((resolve, reject) => {
				if (isInitialized && config?.userId && !loading && userByid) {
					resolve()
				}
			}),
		[isInitialized, config?.userId, loading, userByid]
	)

	let uniquePost = useMemo(() => {
		return feed.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
	}, [feed])

	const fetchPost = async () => {
		await checkLoading()
		const postQuery = new Moralis.Query('NewGreet')
		postQuery
			.descending('timestamp_decimal')
			.notEqualTo('uri', '')
			.equalTo('creator', userByid?.get('userAddress'))
			.skip((page - 1) * pageSize)
			.limit(pageSize)
		let post = await postQuery.find()
		return post
	}

	const fetchMore = async () => {
		//MainFeedStore.setPage(1)
		//setPage(p=>p+1)
		let post = await fetchPost()
		if (post?.length === 0 || !post) {
			setHasMore(false)
			return
		}
		let formatted = await getFormattedFeed(post || [])
		formatted.length !== 0 && setFeed((f) => f.concat(formatted))
		setPage((p) => p + 1)
		//setPage(p=>p+1)
	}

	const initialPost = async () => {
		//await checkLoading()
		let post = await fetchPost()
		let formatted = await getFormattedFeed(post || [])
		formatted.length !== 0 && setFeed((f) => f.concat(formatted))
		setPage((p) => p + 1)
	}

	// useEffect(() => {
	// 	initialPost()
	// }, [])

	useEffect(() => {
		console.log(userByid)
		if (userByid && !loading) {
			initialPost()
			//setFirstFetchDone(true)
		}
	}, [loading, userByid])

	return {
		fetchMore: fetchMore,
		feed: uniquePost,
		count: feed.length,
		hasMore,
	}
}

const getFormattedFeed = async (
	feedData: Moralis.Object<Moralis.Attributes>[]
) => {
	let allData = await Promise.all(
		feedData.map((d) => {
			return axios.get<GreetMetaData>(d.get('uri'))
		})
	)
	let id = feedData.map((d) => d.get('uid') as string)
	let timestamp = feedData.map((d) => d.get('timestamp') as string)

	let formattedData: Feed[] = allData.map(({ data }, i) => ({
		userName: data.creatorName,
		id: id[i],
		images: data.images?.map((i) => i.URI),
		textContent: data.text,
		timestamp: timestamp[i],
	}))
	return formattedData
}
