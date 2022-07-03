//This code is only for graphql codegen purpose

import { gql } from '@apollo/client'
import React from 'react'

const Operation = () => {
	const identity = gql`
		query FullIdentityQuery {
			identity(
				address: "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
				network: ETH
			) {
				address
				domain
				avatar
				joinTime
				twitter {
					handle
					avatar
					verified
					tweetId
					source
					followerCount
				}
				github {
					username
					gistId
					userId
				}
				followerCount(namespace: "CyberConnect")
				followingCount(namespace: "CyberConnect")
				followings(namespace: "CyberConnect", first: 2, after: "-1") {
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
					list {
						address
						domain
						avatar
						alias
						namespace
						lastModifiedTime
						verifiable
					}
				}
				followers(namespace: "CyberConnect", first: 2, after: "-1") {
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
					list {
						address
						domain
						avatar
						alias
						namespace
						lastModifiedTime
						verifiable
					}
				}
				friends(namespace: "CyberConnect", first: 2, after: "-1") {
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
					list {
						address
						domain
						avatar
						alias
						namespace
						lastModifiedTime
						verifiable
					}
				}
				unreadNotificationCount(namespaces: ["CyberConnect"])
				notifications(namespaces: ["CyberConnect"], first: 2, after: "-1") {
					pageInfo {
						hasNextPage
						hasPreviousPage
						endCursor
						startCursor
					}
					list {
						id
						toAddress
						network
						namespace
						hasRead
						type
						timestamp
						... on NewConnectionNotification {
							fromAddress
							connectionType
						}
						... on BiConnectReceivedNotification {
							fromAddress
						}
						... on BiConnectAcceptedNotification {
							fromAddress
						}
					}
				}
			}
		}
	`

	const connection = gql`
		query ConnectionsQuery {
			connections(fromAddr: "jiayi92.eth", toAddrList: ["cyberlab.eth"]) {
				fromAddr
				toAddr
				followStatus {
					isFollowed
					isFollowing
				}
				namespace
				alias
				network
				createdAt
				updatedAt
				latestEvent {
					...connect_event
				}
				latestAnchorEvent {
					...connect_event
				}
			}
		}

		fragment connect_event on ConnectionEvent {
			hash
			parentHash
			fromAddr
			toAddr
			network
			namespace
			createdAt
			isAnchor
			proof {
				content
				digest
				signature
				signingKey
				signingKeyAuth {
					message
					signature
					address
				}
				arweaveTxHash
			}
		}
	`

	const bi = gql`
		query BidirectionalConnectionsQuery {
			bidirectionalConnections(
				fromAddr: "0xd45D6496DC32AA91E069C1D7870C5363bC5c8Fbd"
				toAddrList: ["0xC76fbE40144ac56822C651B6e02497D4A576F23d"]
				network: ETH
			) {
				from
				to
				network
				state
				direction
				namespace
				updatedAt
				latestEvent {
					...event
				}
				latestAnchorEvent {
					...event
				}
			}
		}

		fragment event on BiConnEvent {
			hash
			parentHash
			fromAddr
			toAddr
			network
			namespace
			createdAt
			isAnchor
			proof {
				content
				digest
				signature
				signingKey
				signingKeyAuth {
					address
					message
					signature
				}
				arweaveTxHash
			}
			instruction
		}
	`

	const recommend = gql`
		query QueryRecommendation {
			recommendations(
				address: "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
				filter: SOCIAL
				network: ETH
				first: 1
			) {
				result
				data {
					pageInfo {
						startCursor
						endCursor
						hasNextPage
						hasPreviousPage
					}
					list {
						address
						domain
						avatar
						recommendationReason
						followerCount
					}
				}
			}
		}
	`
	const rank = gql`
		query TopFiveRankings {
			rankings(
				network: ETH
				type: FOLLOW
				namespaces: ["CyberConnect"]
				first: 5
			) {
				pageInfo {
					startCursor
					endCursor
					hasNextPage
					hasPreviousPage
				}
				list {
					address
					domain
					followerCount
				}
			}
		}
	`

	const nft = gql`
		query QueryNFTOwners {
			nftOwners(contract: "0x5180db8f5c931aae63c74266b211f580155ecac8") {
				owner
				tokenId
				twitter {
					handle
					followerCount
				}
			}
		}
	`

	return <div>operation</div>
}

export default Operation
