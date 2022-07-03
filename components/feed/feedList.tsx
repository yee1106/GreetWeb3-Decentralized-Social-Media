import { useEffect } from 'react'
import Feed from '@/components/feed/feed'
import { Box, SegmentedControl, ScrollArea } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import userStore from '@/store/user'
import { useWindowScroll } from '@mantine/hooks'
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
	return (
		<>
			<Box>
				<InfiniteScroll
					dataLength={FeedList.length}
					next={props.fetchMore}
					hasMore={props.hasMore}
					loader={<h3 style={{ color: 'black' }}> Loading...</h3>}
					endMessage={<h4 style={{ color: 'black' }}>Nothing more to show</h4>}
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
