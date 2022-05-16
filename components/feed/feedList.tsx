import { useEffect } from 'react'
import Feed from '@/components/feed/feed'
import { Box, SegmentedControl, ScrollArea } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import userStore from '@/store/user'
import { useWindowScroll } from '@mantine/hooks'
import { FeedFilter } from '@/utils/constants/constants'

interface feedListProps {
	feeds: Feed[]
	filter: string
	isFollowing: boolean
}

const FeedList = (props: feedListProps) => {
	return (
		<>
			<Box>
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
			</Box>
		</>
	)
}

export default FeedList
