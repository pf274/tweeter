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
  User,
  Status,
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
  const request: GetFollowersRequest = JSON.parse(requestInfo.body);
  console.log("Handling get followers request:", request);
  const response = await ItemLoadService.loadMoreFollowers(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    request.pageSize,
    User.fromDTO(request.lastItem)
  );
  return {
    users: response.users.map((user) => user.dto),
    hasMore: response.hasMore,
  };
}

async function handleGetFollowees(
  requestInfo: ApiRequestInfo
): Promise<GetFolloweesResponse> {
  const request: GetFolloweesRequest = JSON.parse(requestInfo.body);
  console.log("Handling get followees request:", request);
  const response = await ItemLoadService.loadMoreFollowees(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    request.pageSize,
    User.fromDTO(request.lastItem)
  );
  return {
    users: response.users.map((user) => user.dto),
    hasMore: response.hasMore,
  };
}

async function handleGetFeed(
  requestInfo: ApiRequestInfo
): Promise<GetFeedResponse> {
  const request: GetFeedRequest = JSON.parse(requestInfo.body);
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
  const request: GetStoriesRequest = JSON.parse(requestInfo.body);
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
