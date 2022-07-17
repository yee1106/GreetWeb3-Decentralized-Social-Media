import { useEffect } from 'react'
import Feed from '@/components/feed/feed'
import {
	Box,
	SegmentedControl,
	ScrollArea,
	Text,
	Group,
	Center,
	Skeleton,
	Loader,
} from '@mantine/core'
import { observer } from 'mobx-react-lite'
import userStore from '@/store/store'
import { useViewportSize, useWindowScroll } from '@mantine/hooks'
import { FeedFilter } from '@/utils/constants/constants'
import InfiniteScroll from 'react-infinite-scroll-component'

interface feedListProps {
	feeds: Feed[]
	filter: string
	isFollowing: boolean
	fetchMore: () => any
	hasMore: boolean
}

const FeedList = (props: feedListProps) => {
	const { width } = useViewportSize()
	return (
		<>
			<Box>
				<InfiniteScroll
					dataLength={props.feeds.length}
					next={props.fetchMore}
					hasMore={props.hasMore}
					loader={
						<Center>
							<Loader variant='bars' color='indigo' />
						</Center>
					}
				>
					{props.feeds.map((f) => (
						<Feed
							key={f.id}
							userName={f.userName}
							id={f.id}
							timestamp={f.timestamp}
							textContent={f.textContent}
							images={f.images}
							video={f.video}
						/>
					))}
				</InfiniteScroll>
			</Box>
		</>
	)
}

export default FeedList
