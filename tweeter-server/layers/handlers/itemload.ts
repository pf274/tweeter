import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { ItemLoadService } from "../services/itemloadService";
import {
  GetFeedRequest,
  GetFeedResponse,
  GetFollowersRequest,
  GetFollowersResponse,
  GetFolloweesRequest,
  GetFolloweesResponse,
  GetStoriesRequest,
  GetStoriesResponse,
  AuthToken,
  AuthTokenDTO,
  User,
  UserDTO,
  Status,
  StatusDTO,
} from "tweeter-shared";

module.exports.handler = basicApiHandler("itemload", [
  ApiRoute.get("/items/followers", handleGetFollowers),
  ApiRoute.get("/items/followees", handleGetFollowees),
  ApiRoute.get("/items/feed", handleGetFeed),
  ApiRoute.get("/items/stories", handleGetStories),
]);

async function handleGetFollowers(
  requestInfo: ApiRequestInfo
): Promise<GetFollowersResponse> {
  const request: GetFollowersRequest = {
    authToken: JSON.parse(
      requestInfo.queryParameters.authToken
    ) as AuthTokenDTO,
    user: JSON.parse(requestInfo.queryParameters.user) as UserDTO,
    pageSize: requestInfo.queryParameters.pageSize as number,
    lastItem: JSON.parse(
      requestInfo.queryParameters.lastItem
    ) as UserDTO | null,
  };
  console.log("Handling get followers request:", request);
  const response = await ItemLoadService.loadMoreFollowers(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    request.pageSize,
    request.lastItem ? User.fromDTO(request.lastItem) : null
  );
  return {
    users: response.users.map((user) => user.dto),
    hasMore: response.hasMore,
  };
}

async function handleGetFollowees(
  requestInfo: ApiRequestInfo
): Promise<GetFolloweesResponse> {
  const request: GetFolloweesRequest = {
    authToken: JSON.parse(
      requestInfo.queryParameters.authToken
    ) as AuthTokenDTO,
    user: JSON.parse(requestInfo.queryParameters.user) as UserDTO,
    pageSize: requestInfo.queryParameters.pageSize as number,
    lastItem: JSON.parse(
      requestInfo.queryParameters.lastItem
    ) as UserDTO | null,
  };
  console.log("Handling get followees request:", request);
  const response = await ItemLoadService.loadMoreFollowees(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    request.pageSize,
    request.lastItem ? User.fromDTO(request.lastItem) : null
  );
  return {
    users: response.users.map((user) => user.dto),
    hasMore: response.hasMore,
  };
}

async function handleGetFeed(
  requestInfo: ApiRequestInfo
): Promise<GetFeedResponse> {
  const request: GetFeedRequest = {
    authToken: JSON.parse(
      requestInfo.queryParameters.authToken
    ) as AuthTokenDTO,
    user: JSON.parse(requestInfo.queryParameters.user) as UserDTO,
    pageSize: requestInfo.queryParameters.pageSize as number,
    lastItem: JSON.parse(
      requestInfo.queryParameters.lastItem
    ) as StatusDTO | null,
  };
  console.log("Handling get feed request:", request);
  const response = await ItemLoadService.loadMoreFeedItems(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    request.pageSize,
    request.lastItem ? Status.fromDTO(request.lastItem) : null
  );
  return {
    statusItems: response.statusItems.map((status) => status.dto),
    hasMore: response.hasMore,
  };
}

async function handleGetStories(
  requestInfo: ApiRequestInfo
): Promise<GetStoriesResponse> {
  const request: GetStoriesRequest = {
    authToken: JSON.parse(
      requestInfo.queryParameters.authToken
    ) as AuthTokenDTO,
    user: JSON.parse(requestInfo.queryParameters.user) as UserDTO,
    pageSize: requestInfo.queryParameters.pageSize as number,
    lastItem: JSON.parse(
      requestInfo.queryParameters.lastItem
    ) as StatusDTO | null,
  };
  console.log("Handling get stories request:", request);
  const response = await ItemLoadService.loadMoreStoryItems(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    request.pageSize,
    request.lastItem ? Status.fromDTO(request.lastItem) : null
  );
  return {
    statusItems: response.statusItems.map((status) => status.dto),
    hasMore: response.hasMore,
  };
}
