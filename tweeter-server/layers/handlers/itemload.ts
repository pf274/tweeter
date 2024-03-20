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
    request.authToken,
    request.user,
    request.pageSize,
    request.lastItem
  );
  return response;
}

async function handleGetFollowees(
  requestInfo: ApiRequestInfo
): Promise<GetFolloweesResponse> {
  const request: GetFolloweesRequest = JSON.parse(requestInfo.body);
  console.log("Handling get followees request:", request);
  const response = await ItemLoadService.loadMoreFollowees(
    request.authToken,
    request.user,
    request.pageSize,
    request.lastItem
  );
  return response;
}

async function handleGetFeed(
  requestInfo: ApiRequestInfo
): Promise<GetFeedResponse> {
  const request: GetFeedRequest = JSON.parse(requestInfo.body);
  console.log("Handling get feed request:", request);
  const response = await ItemLoadService.loadMoreFeedItems(
    request.authToken,
    request.user,
    request.pageSize,
    request.lastItem
  );
  return response;
}

async function handleGetStories(
  requestInfo: ApiRequestInfo
): Promise<GetStoriesResponse> {
  const request: GetStoriesRequest = JSON.parse(requestInfo.body);
  console.log("Handling get stories request:", request);
  const response = await ItemLoadService.loadMoreStoryItems(
    request.authToken,
    request.user,
    request.pageSize,
    request.lastItem
  );
  return response;
}
