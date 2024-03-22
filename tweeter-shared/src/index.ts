export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

export type { FollowDTO } from "./model/domain/Follow";
export type { StatusDTO } from "./model/domain/Status";
export type { UserDTO } from "./model/domain/User";
export type { AuthTokenDTO } from "./model/domain/AuthToken";

// requests
export type { TweeterRequest } from "./model/requests/TweeterRequest";
export type { LoginRequest } from "./model/requests/LoginRequest";
export type { RegisterRequest } from "./model/requests/RegisterRequest";
export type { FollowRequest } from "./model/requests/FollowRequest";
export type { UnfollowRequest } from "./model/requests/UnfollowRequest";
export type { GetFollowersRequest } from "./model/requests/GetFollowersRequest";
export type { GetFolloweesRequest } from "./model/requests/GetFolloweesRequest";
export type { GetFollowersCountRequest } from "./model/requests/GetFollowersCountRequest";
export type { GetFolloweesCountRequest } from "./model/requests/GetFolloweesCountRequest";
export type { GetFeedRequest } from "./model/requests/GetFeedRequest";
export type { GetIsFollowerRequest } from "./model/requests/GetIsFollowerRequest";
export type { GetStoriesRequest } from "./model/requests/GetStoriesRequest";
export type { GetUserByAliasRequest } from "./model/requests/GetUserByAliasRequest";
export type { PostStatusRequest } from "./model/requests/PostStatusRequest";
export type { LogoutRequest } from "./model/requests/LogoutRequest";

// responses
export type { TweeterResponse } from "./model/responses/TweeterResponse";
export type { LoginResponse } from "./model/responses/LoginResponse";
export type { ErrorResponse } from "./model/responses/ErrorResponse";
export type { FollowResponse } from "./model/responses/FollowResponse";
export type { GetFeedResponse } from "./model/responses/GetFeedResponse";
export type { GetFolloweesCountResponse } from "./model/responses/GetFolloweesCountResponse";
export type { GetFollowersCountResponse } from "./model/responses/GetFollowersCountResponse";
export type { GetFollowersResponse } from "./model/responses/GetFollowersResponse";
export type { GetFolloweesResponse } from "./model/responses/GetFolloweesResponse";
export type { GetIsFollowerResponse } from "./model/responses/GetIsFollowerResponse";
export type { GetStoriesResponse } from "./model/responses/GetStoriesResponse";
export type { GetUserByAliasResponse } from "./model/responses/GetUserByAliasResponse";
export type { PostStatusResponse } from "./model/responses/PostStatusResponse";
export type { RegisterResponse } from "./model/responses/RegisterResponse";
export type { UnfollowResponse } from "./model/responses/UnfollowResponse";
export type { LogoutResponse } from "./model/responses/LogoutResponse";

// All classes that should be avaialble to other modules need to exported here. export * does not work when
// uploading to lambda. Instead we have to list each export.
