export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Percentage: any;
  Time: any;
  Upload: any;
};

export type AckAllNotificationsInput = {
  address: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  /**
   * Unix timestamp in millisecond.
   * Use current timestamp.
   */
  timestamp: Scalars['String'];
};

export type AckAllNotificationsResponse = {
  __typename?: 'AckAllNotificationsResponse';
  result: AckAllNotificationsResponse_Result;
};

export enum AckAllNotificationsResponse_Result {
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  InvalidTimestamp = 'INVALID_TIMESTAMP',
  OperationExpired = 'OPERATION_EXPIRED',
  Success = 'SUCCESS'
}

export type AckNotificationsInput = {
  address: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  notificationIds: Array<Scalars['String']>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
};

export type AckNotificationsResponse = {
  __typename?: 'AckNotificationsResponse';
  result: AckNotificationsResponse_Result;
};

export enum AckNotificationsResponse_Result {
  AckFailed = 'ACK_FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  Success = 'SUCCESS'
}

export type AliasResponse = {
  __typename?: 'AliasResponse';
  result: AliasResponse_Result;
};

export enum AliasResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authToken: Scalars['String'];
  result: AuthResponse_Result;
};

export enum AuthResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type BatchConnectResponse = {
  __typename?: 'BatchConnectResponse';
  alreadyFollowed?: Maybe<Array<Scalars['String']>>;
  failToFollow?: Maybe<Array<Scalars['String']>>;
  result: BatchConnectResponse_Result;
  successFollowed?: Maybe<Array<Scalars['String']>>;
};

export enum BatchConnectResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type BatchUpdateConnectionInput = {
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  signingInputs: Array<SigningInput>;
  signingKey: Scalars['String'];
};

export type BiConnEvent = Event & {
  __typename?: 'BiConnEvent';
  createdAt: Scalars['String'];
  fromAddr: Scalars['String'];
  hash: Scalars['String'];
  instruction: BiConnInstruction;
  isAnchor: Scalars['Boolean'];
  namespace: Scalars['String'];
  network: Network;
  parentHash: Scalars['String'];
  proof: Proof;
  toAddr: Scalars['String'];
};

export enum BiConnInstruction {
  Accept = 'ACCEPT',
  Block = 'BLOCK',
  Init = 'INIT',
  Reject = 'REJECT',
  Terminate = 'TERMINATE',
  Unblock = 'UNBLOCK'
}

export enum BiConnState {
  Blacklist = 'BLACKLIST',
  Connected = 'CONNECTED',
  Empty = 'EMPTY',
  Pending = 'PENDING'
}

export type BiConnectAcceptedNotification = Notification & {
  __typename?: 'BiConnectAcceptedNotification';
  fromAddress: Scalars['String'];
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type BiConnectInput = {
  fromAddr: Scalars['String'];
  instruction: BiConnInstruction;
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  toAddr: Scalars['String'];
};

export type BiConnectReceivedNotification = Notification & {
  __typename?: 'BiConnectReceivedNotification';
  fromAddress: Scalars['String'];
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type BiConnectResponse = {
  __typename?: 'BiConnectResponse';
  message: Scalars['String'];
  result: BiConnectResponse_Result;
};

export enum BiConnectResponse_Result {
  ExceedLimit = 'EXCEED_LIMIT',
  InconsistencyError = 'INCONSISTENCY_ERROR',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidParameter = 'INVALID_PARAMETER',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  Success = 'SUCCESS'
}

export type BidirectionalConnection = {
  __typename?: 'BidirectionalConnection';
  direction: Direction;
  from: Scalars['String'];
  latestAnchorEvent?: Maybe<BiConnEvent>;
  latestEvent?: Maybe<BiConnEvent>;
  latestHash: Scalars['String'];
  namespace: Scalars['String'];
  network: Network;
  state: BiConnState;
  to: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Connect = {
  __typename?: 'Connect';
  address: Scalars['String'];
  alias: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  /** @deprecated `lastModifiedTime` is deprecated. */
  lastModifiedTime: Scalars['String'];
  namespace: Scalars['String'];
  type: ConnectionType;
  verifiable: Scalars['Boolean'];
};

export type ConnectResponse = {
  __typename?: 'ConnectResponse';
  result: ConnectResponse_Result;
};

export enum ConnectResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type Connection = {
  __typename?: 'Connection';
  /** The alias set by the fromAddr for toAddr. */
  alias: Scalars['String'];
  createdAt: Scalars['String'];
  followStatus: FollowStatus;
  fromAddr: Scalars['String'];
  latestAnchorEvent?: Maybe<ConnectionEvent>;
  latestEvent?: Maybe<ConnectionEvent>;
  namespace: Scalars['String'];
  network: Network;
  /** @deprecated `proof` is deprecated. Use `latestEvent` to retrieve it. */
  proof: Scalars['String'];
  toAddr: Scalars['String'];
  /** Connection type. Default is FOLLOW. */
  type: ConnectionType;
  updatedAt: Scalars['String'];
};

export type ConnectionEvent = Event & {
  __typename?: 'ConnectionEvent';
  createdAt: Scalars['String'];
  fromAddr: Scalars['String'];
  hash: Scalars['String'];
  isAnchor: Scalars['Boolean'];
  namespace: Scalars['String'];
  network: Network;
  operator: Scalars['Boolean'];
  parentHash: Scalars['String'];
  proof: Proof;
  toAddr: Scalars['String'];
  type: ConnectionType;
};

export type ConnectionIdentityPage = {
  __typename?: 'ConnectionIdentityPage';
  list: Array<Connect>;
  pageInfo: PageInfo;
};

export type ConnectionSummary = {
  __typename?: 'ConnectionSummary';
  connectionCount: Scalars['Int'];
  connectionDelta: Scalars['Int'];
  namespaceCount: Scalars['Int'];
  userCount: Scalars['Int'];
  userDelta: Scalars['Int'];
};

export enum ConnectionType {
  Follow = 'FOLLOW',
  Like = 'LIKE',
  Report = 'REPORT',
  Vote = 'VOTE',
  Watch = 'WATCH'
}

export enum Direction {
  Bidirection = 'BIDIRECTION',
  FromTo = 'FROM_TO',
  ToFrom = 'TO_FROM'
}

export type DisconnectResponse = {
  __typename?: 'DisconnectResponse';
  result: DisconnectResponse_Result;
};

export enum DisconnectResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type Event = {
  createdAt: Scalars['String'];
  fromAddr: Scalars['String'];
  hash: Scalars['String'];
  isAnchor: Scalars['Boolean'];
  namespace: Scalars['String'];
  network: Network;
  parentHash: Scalars['String'];
  proof: Proof;
  toAddr: Scalars['String'];
};

export type EventPage = {
  __typename?: 'EventPage';
  list: Array<Event>;
  pageInfo: PageInfo;
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  result: FollowResponse_Result;
};

export enum FollowResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type FollowStatus = {
  __typename?: 'FollowStatus';
  isFollowed: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
};

export type Github = {
  __typename?: 'Github';
  gistId: Scalars['String'];
  userId: Scalars['Int'];
  username: Scalars['String'];
};

export type HomePage = {
  __typename?: 'HomePage';
  connectionCount: Scalars['Int'];
  indexedConnectionCount: Scalars['Int'];
  indexedUserCount: Scalars['Int'];
  userCount: Scalars['Int'];
};

export type MetricsCount = {
  __typename?: 'MetricsCount';
  top10Count: Scalars['Int'];
  top100Count: Scalars['Int'];
  top1000Count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ackAllNotifications: AckAllNotificationsResponse;
  ackNotifications: AckNotificationsResponse;
  alias: AliasResponse;
  /** @deprecated `auth` for centralized authorization is deprecated. To make data verifiable, use `registerKey` instead. */
  auth: AuthResponse;
  batchConnect: BatchConnectResponse;
  bidirectionalConnect: BiConnectResponse;
  connect: ConnectResponse;
  disconnect: DisconnectResponse;
  /** @deprecated `follow` is deprecated. To make data verifiable, use `connect` instead. */
  follow: FollowResponse;
  registerKey: RegisterKeyResponse;
  /** @deprecated `setAlias` is deprecated. To make data verifiable, use `alias` instead. */
  setAlias: SetAliasResponse;
  /** @deprecated `setProfile` is deprecated. */
  setProfile: SetProfileResponse;
  setTwitterHandle: SetTwitterHandleResponse;
  subscribe: SubscribeResponse;
  /** @deprecated `unfollow` is deprecated. To make data verifiable, use `disconnect` instead. */
  unfollow: UnFollowResponse;
  verifyGithub: VerifyGithubResponse;
  verifyTwitter: VerifyTwitterResponse;
};


export type MutationAckAllNotificationsArgs = {
  input: AckAllNotificationsInput;
};


export type MutationAckNotificationsArgs = {
  input: AckNotificationsInput;
};


export type MutationAliasArgs = {
  input: UpdateConnectionInput;
};


export type MutationAuthArgs = {
  address: Scalars['String'];
  network?: InputMaybe<Network>;
  signature: Scalars['String'];
};


export type MutationBatchConnectArgs = {
  input: BatchUpdateConnectionInput;
};


export type MutationBidirectionalConnectArgs = {
  input: BiConnectInput;
};


export type MutationConnectArgs = {
  input: UpdateConnectionInput;
};


export type MutationDisconnectArgs = {
  input: UpdateConnectionInput;
};


export type MutationFollowArgs = {
  alias?: InputMaybe<Scalars['String']>;
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  signature: Scalars['String'];
  toAddr: Scalars['String'];
};


export type MutationRegisterKeyArgs = {
  input: RegisterKeyInput;
};


export type MutationSetAliasArgs = {
  alias: Scalars['String'];
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  signature: Scalars['String'];
  toAddr: Scalars['String'];
};


export type MutationSetProfileArgs = {
  address: Scalars['String'];
  avatar?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  network: Network;
  signature: Scalars['String'];
};


export type MutationSetTwitterHandleArgs = {
  address: Scalars['String'];
  handle: Scalars['String'];
  network?: InputMaybe<Network>;
};


export type MutationSubscribeArgs = {
  input: Array<SubscribeInput>;
};


export type MutationUnfollowArgs = {
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  signature: Scalars['String'];
  toAddr: Scalars['String'];
};


export type MutationVerifyGithubArgs = {
  address: Scalars['String'];
  gistId: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type MutationVerifyTwitterArgs = {
  address: Scalars['String'];
  handle: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};

export type NftOwner = {
  __typename?: 'NFTOwner';
  owner: Scalars['String'];
  tokenId: Scalars['String'];
  twitter?: Maybe<Twitter>;
};

export enum Network {
  /** Ethereum network. */
  Eth = 'ETH',
  /** Solana network. */
  Solana = 'SOLANA'
}

export type NewConnectionNotification = Notification & {
  __typename?: 'NewConnectionNotification';
  connectionType: ConnectionType;
  fromAddress: Scalars['String'];
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type Node = {
  id: Scalars['ID'];
};

export type Notification = {
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type NotificationPage = {
  __typename?: 'NotificationPage';
  list: Array<Notification>;
  pageInfo: PageInfo;
};

export enum NotificationType {
  BiconnectAccepted = 'BICONNECT_ACCEPTED',
  BiconnectReceived = 'BICONNECT_RECEIVED',
  NewConnection = 'NEW_CONNECTION'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Popular = {
  __typename?: 'Popular';
  address: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  followerCount: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  recommendationReason: Scalars['String'];
};

export type PopularPage = {
  __typename?: 'PopularPage';
  list: Array<Popular>;
  pageInfo: PageInfo;
};

export type Proof = {
  __typename?: 'Proof';
  arweaveTxHash: Scalars['String'];
  content: Scalars['String'];
  digest: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  signingKeyAuth: SigningKeyAuth;
};

export type Query = {
  __typename?: 'Query';
  bidirectionalConnectionEvent: Event;
  bidirectionalConnectionEvents: EventPage;
  bidirectionalConnections: Array<BidirectionalConnection>;
  connectionEvent: Event;
  connectionEvents: EventPage;
  connectionSummary: ConnectionSummary;
  connections: Array<Connection>;
  featured: Array<Popular>;
  /** @deprecated `followStatus` is deprecated. Use `connections.followStatus` instead. */
  followStatus?: Maybe<FollowStatus>;
  /** @deprecated `followingAlias` is deprecated. Use `connections.alias` instead. */
  followingAlias: Scalars['String'];
  homePage: HomePage;
  identity: UserIdentity;
  nftOwners?: Maybe<Array<NftOwner>>;
  popular: PopularPage;
  /** @deprecated `proof` is deprecated. Use `connections.proof` instead. */
  proof: Scalars['String'];
  rankings: UserIdentityPage;
  recommendations: RecommendationResponse;
  twitterRankings: TwitterRankingPage;
};


export type QueryBidirectionalConnectionEventArgs = {
  hash: Scalars['String'];
};


export type QueryBidirectionalConnectionEventsArgs = {
  address?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type QueryBidirectionalConnectionsArgs = {
  fromAddr: Scalars['String'];
  network?: InputMaybe<Network>;
  toAddrList: Array<Scalars['String']>;
};


export type QueryConnectionEventArgs = {
  hash: Scalars['String'];
};


export type QueryConnectionEventsArgs = {
  address?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type QueryConnectionSummaryArgs = {
  namespace?: InputMaybe<Scalars['String']>;
};


export type QueryConnectionsArgs = {
  fromAddr: Scalars['String'];
  network?: InputMaybe<Network>;
  toAddrList: Array<Scalars['String']>;
};


export type QueryFeaturedArgs = {
  fromAddr?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type QueryFollowStatusArgs = {
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  toAddr: Scalars['String'];
};


export type QueryFollowingAliasArgs = {
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  toAddr: Scalars['String'];
};


export type QueryHomePageArgs = {
  network?: InputMaybe<Network>;
};


export type QueryIdentityArgs = {
  address?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type QueryNftOwnersArgs = {
  contract: Scalars['String'];
  tokenId?: InputMaybe<Scalars['String']>;
};


export type QueryPopularArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  fromAddr?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  tags: TagsInput;
};


export type QueryProofArgs = {
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  toAddr: Scalars['String'];
};


export type QueryRankingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  network?: InputMaybe<Network>;
  type?: InputMaybe<ConnectionType>;
};


export type QueryRecommendationsArgs = {
  address?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<RecommFilter>;
  first?: InputMaybe<Scalars['Int']>;
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type QueryTwitterRankingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  fromAddr?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};

export type Ranking = {
  __typename?: 'Ranking';
  address: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  followerCount: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  twitterFollowersCount: Scalars['Int'];
  twitterHandle: Scalars['String'];
  verifiable: Scalars['Boolean'];
};

export enum RecommFilter {
  Defi = 'DEFI',
  Game = 'GAME',
  Nft = 'NFT',
  Social = 'SOCIAL'
}

export type Recommendation = {
  __typename?: 'Recommendation';
  address: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  followerCount: Scalars['Int'];
  recommendationReason: Scalars['String'];
};

export type RecommendationPage = {
  __typename?: 'RecommendationPage';
  list: Array<Recommendation>;
  pageInfo: PageInfo;
};

export type RecommendationResponse = {
  __typename?: 'RecommendationResponse';
  data?: Maybe<RecommendationPage>;
  result: RecommendationResponse_Result;
};

export enum RecommendationResponse_Result {
  Indexing = 'INDEXING',
  Success = 'SUCCESS'
}

export type RegisterKeyInput = {
  address: Scalars['String'];
  message: Scalars['String'];
  network?: InputMaybe<Network>;
  signature: Scalars['String'];
};

export type RegisterKeyResponse = {
  __typename?: 'RegisterKeyResponse';
  result: RegisterKeyResponse_Result;
};

export enum RegisterKeyResponse_Result {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export type SetAliasResponse = {
  __typename?: 'SetAliasResponse';
  result: SetAliasResponse_Result;
};

export enum SetAliasResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type SetProfileResponse = {
  __typename?: 'SetProfileResponse';
  result: SetProfileResponse_Result;
};

export enum SetProfileResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type SetTwitterHandleResponse = {
  __typename?: 'SetTwitterHandleResponse';
  result: SetTwitterHandleResponse_Result;
};

export enum SetTwitterHandleResponse_Result {
  HandleExists = 'HANDLE_EXISTS',
  InvalidAddress = 'INVALID_ADDRESS',
  Success = 'SUCCESS'
}

export type SigningInput = {
  operation: Scalars['String'];
  signature: Scalars['String'];
  toAddr: Scalars['String'];
  type?: InputMaybe<ConnectionType>;
};

export type SigningKeyAuth = {
  __typename?: 'SigningKeyAuth';
  address: Scalars['String'];
  message: Scalars['String'];
  signature: Scalars['String'];
};

export type Social = {
  __typename?: 'Social';
  twitter: Scalars['String'];
};

export type SubscribeInput = {
  address?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type SubscribeResponse = {
  __typename?: 'SubscribeResponse';
  result: SubscribeResponse_Result;
};

export enum SubscribeResponse_Result {
  Success = 'SUCCESS'
}

export enum Tag {
  Featured = 'FEATURED',
  Nftmarket = 'NFTMARKET',
  Plaza = 'PLAZA'
}

export type TagsInput = {
  list: Array<Tag>;
};

export type Twitter = {
  __typename?: 'Twitter';
  /** Twitter avatar. */
  avatar: Scalars['String'];
  /** Twitter followers count, updated every day. */
  followerCount: Scalars['Int'];
  /** @deprecated `followersCount` is deprecated. Use `followerCount` instead. */
  followersCount: Scalars['Int'];
  /** Twitter handle. */
  handle: Scalars['String'];
  /** Data source of twitter handle. */
  source: Scalars['String'];
  /** Verification tweet id. */
  tweetId: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type TwitterRankingPage = {
  __typename?: 'TwitterRankingPage';
  MetricsCount: MetricsCount;
  list: Array<Ranking>;
  pageInfo: PageInfo;
};

export type UnFollowResponse = {
  __typename?: 'UnFollowResponse';
  result: UnFollowResponse_Result;
};

export enum UnFollowResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type UpdateConnectionInput = {
  alias?: InputMaybe<Scalars['String']>;
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  toAddr: Scalars['String'];
  type?: InputMaybe<ConnectionType>;
};

export type UserIdentity = {
  __typename?: 'UserIdentity';
  address: Scalars['String'];
  /** Ethereum: ENS avatar updated every week; Solana: customized profile avatar. */
  avatar: Scalars['String'];
  /** Ethereum: ENS updated every week; Solana: SNS from Bonfida. */
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  followerCount: Scalars['Int'];
  followers: ConnectionIdentityPage;
  followingCount: Scalars['Int'];
  followings: ConnectionIdentityPage;
  /** Mutually followed. */
  friends: ConnectionIdentityPage;
  /** Github info bound to the address. */
  github: Github;
  /** The time of user's first sent transaction. */
  joinTime: Scalars['String'];
  notifications: NotificationPage;
  /** @deprecated `social` is deprecated. Use `twitter` instead. */
  social: Social;
  /** Twitter info bound to the address. */
  twitter: Twitter;
  unreadNotificationCount: Scalars['Int'];
};


export type UserIdentityFollowerCountArgs = {
  namespace?: InputMaybe<Scalars['String']>;
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFollowersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  namespace?: InputMaybe<Scalars['String']>;
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFollowingCountArgs = {
  namespace?: InputMaybe<Scalars['String']>;
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFollowingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  namespace?: InputMaybe<Scalars['String']>;
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFriendsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  namespace?: InputMaybe<Scalars['String']>;
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hasRead?: InputMaybe<Scalars['Boolean']>;
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  timestamp?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<NotificationType>>;
};


export type UserIdentityUnreadNotificationCountArgs = {
  namespaces?: InputMaybe<Array<Scalars['String']>>;
  types?: InputMaybe<Array<NotificationType>>;
};

export type UserIdentityPage = {
  __typename?: 'UserIdentityPage';
  list: Array<UserIdentity>;
  pageInfo: PageInfo;
};

export type VerifyGithubResponse = {
  __typename?: 'VerifyGithubResponse';
  result: VerifyGithubResponse_Result;
};

export enum VerifyGithubResponse_Result {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Failed = 'FAILED',
  GistNotFound = 'GIST_NOT_FOUND',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidHandle = 'INVALID_HANDLE',
  Success = 'SUCCESS',
  UnsupportedNetwork = 'UNSUPPORTED_NETWORK'
}

export type VerifyTwitterResponse = {
  __typename?: 'VerifyTwitterResponse';
  result: VerifyTwitterResponse_Result;
};

export enum VerifyTwitterResponse_Result {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidHandle = 'INVALID_HANDLE',
  Success = 'SUCCESS',
  TweetNotFound = 'TWEET_NOT_FOUND',
  UnsupportedNetwork = 'UNSUPPORTED_NETWORK'
}
