export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Percentage: any
  Time: any
  Upload: any
}

export type AliasResponse = {
  __typename?: "AliasResponse"
  result: ConnectionResult
}

export type AuthResponse = {
  __typename?: "AuthResponse"
  result: AuthResponse_Result
  authToken: Scalars["String"]
}

export enum AuthResponse_Result {
  Success = "SUCCESS",
  AuthenticationFailed = "AUTHENTICATION_FAILED"
}

export type BatchConnectResponse = {
  __typename?: "BatchConnectResponse"
  result: ConnectionResult
  alreadyFollowed?: Maybe<Array<Scalars["String"]>>
  successFollowed?: Maybe<Array<Scalars["String"]>>
  failToFollow?: Maybe<Array<Scalars["String"]>>
}

export type BatchUpdateConnectionInput = {
  fromAddr: Scalars["String"]
  signingInputs: Array<SigningInput>
  signingKey: Scalars["String"]
  namespace?: Maybe<Scalars["String"]>
  network?: Maybe<Network>
}

export type Connect = {
  __typename?: "Connect"
  address: Scalars["String"]
  domain: Scalars["String"]
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars["String"]
  avatar: Scalars["String"]
  alias: Scalars["String"]
  namespace: Scalars["String"]
  type: ConnectionType
  /** @deprecated `lastModifiedTime` is deprecated. */
  lastModifiedTime: Scalars["String"]
  verifiable: Scalars["Boolean"]
}

export type ConnectResponse = {
  __typename?: "ConnectResponse"
  result: ConnectionResult
}

export type Connection = {
  __typename?: "Connection"
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  followStatus: FollowStatus
  namespace: Scalars["String"]
  alias: Scalars["String"]
  network: Network
  type: ConnectionType
  updatedAt: Scalars["String"]
  createdAt: Scalars["String"]
  proof: Scalars["String"]
}

export type ConnectionIdentityPage = {
  __typename?: "ConnectionIdentityPage"
  pageInfo: PageInfo
  list: Array<Connect>
}

export enum ConnectionResult {
  Success = "SUCCESS",
  Failed = "FAILED",
  Connected = "CONNECTED",
  Disconnected = "DISCONNECTED",
  InvalidAddress = "INVALID_ADDRESS",
  DuplicateAddress = "DUPLICATE_ADDRESS",
  InvalidSignature = "INVALID_SIGNATURE",
  InvalidOperation = "INVALID_OPERATION",
  SigningKeyExpired = "SIGNING_KEY_EXPIRED"
}

export enum ConnectionType {
  Follow = "FOLLOW",
  Like = "LIKE",
  Report = "REPORT",
  Watch = "WATCH",
  Vote = "VOTE"
}

export type DisconnectResponse = {
  __typename?: "DisconnectResponse"
  result: ConnectionResult
}

export type FollowResponse = {
  __typename?: "FollowResponse"
  result: FollowResponse_Result
}

export enum FollowResponse_Result {
  Success = "SUCCESS",
  Failed = "FAILED",
  InvalidAddress = "INVALID_ADDRESS",
  AuthenticationFailed = "AUTHENTICATION_FAILED",
  EmptyNamespace = "EMPTY_NAMESPACE",
  Followed = "FOLLOWED"
}

export type FollowStatus = {
  __typename?: "FollowStatus"
  isFollowed: Scalars["Boolean"]
  isFollowing: Scalars["Boolean"]
}

export type HomePage = {
  __typename?: "HomePage"
  userCount: Scalars["Int"]
  connectionCount: Scalars["Int"]
  indexedUserCount: Scalars["Int"]
  indexedConnectionCount: Scalars["Int"]
}

export type MetricsCount = {
  __typename?: "MetricsCount"
  top10Count: Scalars["Int"]
  top100Count: Scalars["Int"]
  top1000Count: Scalars["Int"]
}

export type Mutation = {
  __typename?: "Mutation"
  registerKey: RegisterKeyResponse
  connect: ConnectResponse
  disconnect: DisconnectResponse
  alias: AliasResponse
  batchConnect: BatchConnectResponse
  setTwitterHandle: SetTwitterHandleResponse
  subscribe: SubscribeResponse
  /** @deprecated `auth` for centralized authorization is deprecated. To make data verifiable, use `registerKey` instead. */
  auth: AuthResponse
  /** @deprecated `follow` is deprecated. To make data verifiable, use `connect` instead. */
  follow: FollowResponse
  /** @deprecated `unfollow` is deprecated. To make data verifiable, use `disconnect` instead. */
  unfollow: UnFollowResponse
  /** @deprecated `setAlias` is deprecated. To make data verifiable, use `alias` instead. */
  setAlias: SetAliasResponse
  setProfile: SetProfileResponse
}

export type MutationRegisterKeyArgs = {
  input: RegisterKeyInput
}

export type MutationConnectArgs = {
  input: UpdateConnectionInput
}

export type MutationDisconnectArgs = {
  input: UpdateConnectionInput
}

export type MutationAliasArgs = {
  input: UpdateConnectionInput
}

export type MutationBatchConnectArgs = {
  input: BatchUpdateConnectionInput
}

export type MutationSetTwitterHandleArgs = {
  address: Scalars["String"]
  handle: Scalars["String"]
  network?: Maybe<Network>
}

export type MutationSubscribeArgs = {
  input: Array<SubscribeInput>
}

export type MutationAuthArgs = {
  address: Scalars["String"]
  signature: Scalars["String"]
  network?: Maybe<Network>
}

export type MutationFollowArgs = {
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  signature: Scalars["String"]
  network?: Maybe<Network>
  alias?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
}

export type MutationUnfollowArgs = {
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  signature: Scalars["String"]
  network?: Maybe<Network>
  namespace?: Maybe<Scalars["String"]>
}

export type MutationSetAliasArgs = {
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  signature: Scalars["String"]
  alias: Scalars["String"]
  network?: Maybe<Network>
  namespace?: Maybe<Scalars["String"]>
}

export type MutationSetProfileArgs = {
  address: Scalars["String"]
  avatar?: Maybe<Scalars["String"]>
  domain?: Maybe<Scalars["String"]>
  signature: Scalars["String"]
  network: Network
}

export type NftOwner = {
  __typename?: "NFTOwner"
  tokenId: Scalars["String"]
  owner: Scalars["String"]
  twitter?: Maybe<Twitter>
}

export enum Network {
  Eth = "ETH",
  Solana = "SOLANA"
}

export type Node = {
  id: Scalars["ID"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  startCursor: Scalars["String"]
  endCursor: Scalars["String"]
  hasNextPage: Scalars["Boolean"]
  hasPreviousPage: Scalars["Boolean"]
}

export type Popular = {
  __typename?: "Popular"
  address: Scalars["String"]
  domain: Scalars["String"]
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars["String"]
  recommendationReason: Scalars["String"]
  followerCount: Scalars["Int"]
  isFollowing: Scalars["Boolean"]
  avatar: Scalars["String"]
}

export type PopularPage = {
  __typename?: "PopularPage"
  pageInfo: PageInfo
  list: Array<Popular>
}

export type Query = {
  __typename?: "Query"
  identity: UserIdentity
  recommendations: RecommendationResponse
  connections: Array<Connection>
  homePage: HomePage
  rankings: UserIdentityPage
  popular: PopularPage
  featured: Array<Popular>
  nftOwners?: Maybe<Array<NftOwner>>
  twitterRankings: TwitterRankingPage
  /** @deprecated `proof` is deprecated. Use `connections.proof` instead. */
  proof: Scalars["String"]
  /** @deprecated `followStatus` is deprecated. Use `connections.followStatus` instead. */
  followStatus?: Maybe<FollowStatus>
  /** @deprecated `followingAlias` is deprecated. Use `connections.alias` instead. */
  followingAlias: Scalars["String"]
}

export type QueryIdentityArgs = {
  address: Scalars["String"]
  network?: Maybe<Network>
}

export type QueryRecommendationsArgs = {
  address: Scalars["String"]
  filter?: Maybe<RecommFilter>
  network?: Maybe<Network>
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type QueryConnectionsArgs = {
  fromAddr: Scalars["String"]
  toAddrList: Array<Scalars["String"]>
  network?: Maybe<Network>
}

export type QueryHomePageArgs = {
  network?: Maybe<Network>
}

export type QueryRankingsArgs = {
  network?: Maybe<Network>
  type?: Maybe<ConnectionType>
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type QueryPopularArgs = {
  fromAddr?: Maybe<Scalars["String"]>
  tags: TagsInput
  network?: Maybe<Network>
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type QueryFeaturedArgs = {
  fromAddr?: Maybe<Scalars["String"]>
  network?: Maybe<Network>
}

export type QueryNftOwnersArgs = {
  contract: Scalars["String"]
  tokenId?: Maybe<Scalars["String"]>
}

export type QueryTwitterRankingsArgs = {
  fromAddr?: Maybe<Scalars["String"]>
  network?: Maybe<Network>
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type QueryProofArgs = {
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  namespace?: Maybe<Scalars["String"]>
  network?: Maybe<Network>
}

export type QueryFollowStatusArgs = {
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  namespace?: Maybe<Scalars["String"]>
  network?: Maybe<Network>
}

export type QueryFollowingAliasArgs = {
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  namespace?: Maybe<Scalars["String"]>
  network?: Maybe<Network>
}

export type Ranking = {
  __typename?: "Ranking"
  address: Scalars["String"]
  domain: Scalars["String"]
  avatar: Scalars["String"]
  followerCount: Scalars["Int"]
  isFollowing: Scalars["Boolean"]
  verifiable: Scalars["Boolean"]
  twitterHandle: Scalars["String"]
  twitterFollowersCount: Scalars["Int"]
}

export enum RecommFilter {
  Social = "SOCIAL",
  Nft = "NFT",
  Defi = "DEFI",
  Game = "GAME"
}

export type Recommendation = {
  __typename?: "Recommendation"
  address: Scalars["String"]
  domain: Scalars["String"]
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars["String"]
  avatar: Scalars["String"]
  followerCount: Scalars["Int"]
  recommendationReason: Scalars["String"]
}

export type RecommendationPage = {
  __typename?: "RecommendationPage"
  pageInfo: PageInfo
  list: Array<Recommendation>
}

export type RecommendationResponse = {
  __typename?: "RecommendationResponse"
  result: RecommendationResponse_Result
  data?: Maybe<RecommendationPage>
}

export enum RecommendationResponse_Result {
  Success = "SUCCESS",
  Indexing = "INDEXING"
}

export type RegisterKeyInput = {
  address: Scalars["String"]
  message: Scalars["String"]
  signature: Scalars["String"]
  network?: Maybe<Network>
}

export type RegisterKeyResponse = {
  __typename?: "RegisterKeyResponse"
  result: RegisterKeyResponse_Result
}

export enum RegisterKeyResponse_Result {
  Success = "SUCCESS",
  Failed = "FAILED"
}

export type SetAliasResponse = {
  __typename?: "SetAliasResponse"
  result: SetAliasResponse_Result
}

export enum SetAliasResponse_Result {
  Success = "SUCCESS",
  Failed = "FAILED",
  InvalidAddress = "INVALID_ADDRESS",
  AuthenticationFailed = "AUTHENTICATION_FAILED",
  EmptyNamespace = "EMPTY_NAMESPACE",
  Unfollowed = "UNFOLLOWED"
}

export type SetProfileResponse = {
  __typename?: "SetProfileResponse"
  result: SetProfileResponse_Result
}

export enum SetProfileResponse_Result {
  Success = "SUCCESS",
  UnsupportedNetwork = "UNSUPPORTED_NETWORK",
  InvalidAddress = "INVALID_ADDRESS",
  AuthenticationFailed = "AUTHENTICATION_FAILED",
  ProfileNotExist = "PROFILE_NOT_EXIST"
}

export type SetTwitterHandleResponse = {
  __typename?: "SetTwitterHandleResponse"
  result: SetTwitterHandleResponse_Result
}

export enum SetTwitterHandleResponse_Result {
  Success = "SUCCESS",
  InvalidAddress = "INVALID_ADDRESS",
  HandleExists = "HANDLE_EXISTS"
}

export type SigningInput = {
  toAddr: Scalars["String"]
  signature: Scalars["String"]
  operation: Scalars["String"]
  type?: Maybe<ConnectionType>
}

export type Social = {
  __typename?: "Social"
  twitter: Scalars["String"]
}

export type SubscribeInput = {
  email: Scalars["String"]
  address?: Maybe<Scalars["String"]>
}

export type SubscribeResponse = {
  __typename?: "SubscribeResponse"
  result: SubscribeResponse_Result
}

export enum SubscribeResponse_Result {
  Success = "SUCCESS"
}

export enum Tag {
  Plaza = "PLAZA",
  Featured = "FEATURED",
  Nftmarket = "NFTMARKET"
}

export type TagsInput = {
  list: Array<Tag>
}

export type Twitter = {
  __typename?: "Twitter"
  handle: Scalars["String"]
  avatar: Scalars["String"]
  verified: Scalars["Boolean"]
  tweetId: Scalars["String"]
  followerCount: Scalars["Int"]
  /** @deprecated `followersCount` is deprecated. Use `followerCount` instead. */
  followersCount: Scalars["Int"]
}

export type TwitterRankingPage = {
  __typename?: "TwitterRankingPage"
  MetricsCount: MetricsCount
  pageInfo: PageInfo
  list: Array<Ranking>
}

export type UnFollowResponse = {
  __typename?: "UnFollowResponse"
  result: UnFollowResponse_Result
}

export enum UnFollowResponse_Result {
  Success = "SUCCESS",
  Failed = "FAILED",
  InvalidAddress = "INVALID_ADDRESS",
  AuthenticationFailed = "AUTHENTICATION_FAILED",
  EmptyNamespace = "EMPTY_NAMESPACE",
  Unfollowed = "UNFOLLOWED"
}

export type UpdateConnectionInput = {
  fromAddr: Scalars["String"]
  toAddr: Scalars["String"]
  signature: Scalars["String"]
  operation: Scalars["String"]
  type?: Maybe<ConnectionType>
  signingKey: Scalars["String"]
  namespace?: Maybe<Scalars["String"]>
  alias?: Maybe<Scalars["String"]>
  network?: Maybe<Network>
}

export type UserIdentity = {
  __typename?: "UserIdentity"
  address: Scalars["String"]
  domain: Scalars["String"]
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars["String"]
  /** @deprecated `social` is deprecated. Use `twitter` instead. */
  social: Social
  avatar: Scalars["String"]
  joinTime: Scalars["String"]
  twitter: Twitter
  followerCount: Scalars["Int"]
  followingCount: Scalars["Int"]
  followings: ConnectionIdentityPage
  followers: ConnectionIdentityPage
  friends: ConnectionIdentityPage
}

export type UserIdentityFollowerCountArgs = {
  namespace?: Maybe<Scalars["String"]>
  type?: Maybe<ConnectionType>
}

export type UserIdentityFollowingCountArgs = {
  namespace?: Maybe<Scalars["String"]>
  type?: Maybe<ConnectionType>
}

export type UserIdentityFollowingsArgs = {
  namespace?: Maybe<Scalars["String"]>
  type?: Maybe<ConnectionType>
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type UserIdentityFollowersArgs = {
  namespace?: Maybe<Scalars["String"]>
  type?: Maybe<ConnectionType>
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type UserIdentityFriendsArgs = {
  namespace?: Maybe<Scalars["String"]>
  type?: Maybe<ConnectionType>
  first?: Maybe<Scalars["Int"]>
  after?: Maybe<Scalars["String"]>
}

export type UserIdentityPage = {
  __typename?: "UserIdentityPage"
  pageInfo: PageInfo
  list: Array<UserIdentity>
}
