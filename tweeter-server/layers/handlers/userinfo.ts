import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { UserInfoService } from "../services/UserInfoService";
import {
  FollowRequest,
  FollowResponse,
  GetFolloweesCountRequest,
  GetFolloweesCountResponse,
  GetFollowersCountRequest,
  GetFollowersCountResponse,
  GetIsFollowerRequest,
  GetIsFollowerResponse,
  GetUserByAliasRequest,
  GetUserByAliasResponse,
  UnfollowRequest,
  UnfollowResponse,
} from "tweeter-shared";

module.exports.handler = basicApiHandler("userinfo", [
  ApiRoute.get("/user/get", handleGetUserByAlias),
  ApiRoute.get("/user/followersCount", handleGetFollowersCount),
  ApiRoute.get("/user/followeesCount", handleGetFolloweesCount),
  ApiRoute.get("/user/isFollower", handleIsFollower),
  ApiRoute.post("/user/follow", handleFollowUser),
  ApiRoute.post("/user/unfollow", handleUnfollowUser),
]);

async function handleGetUserByAlias(
  requestInfo: ApiRequestInfo
): Promise<GetUserByAliasResponse> {
  const request: GetUserByAliasRequest = JSON.parse(requestInfo.body);
  console.log("Handling get user by alias request:", request);
  const response = await UserInfoService.getUserByAlias(
    request.authToken,
    request.alias
  );
  return response;
}

async function handleGetFollowersCount(
  requestInfo: ApiRequestInfo
): Promise<GetFollowersCountResponse> {
  const request: GetFollowersCountRequest = JSON.parse(requestInfo.body);
  console.log("Handling get followers count request:", request);
  const response = await UserInfoService.getFollowersCount(
    request.authToken,
    request.user
  );
  return response;
}

async function handleGetFolloweesCount(
  requestInfo: ApiRequestInfo
): Promise<GetFolloweesCountResponse> {
  const request: GetFolloweesCountRequest = JSON.parse(requestInfo.body);
  console.log("Handling get followees count request:", request);
  const response = await UserInfoService.getFolloweesCount(
    request.authToken,
    request.user
  );
  return response;
}

async function handleIsFollower(
  requestInfo: ApiRequestInfo
): Promise<GetIsFollowerResponse> {
  const request: GetIsFollowerRequest = JSON.parse(requestInfo.body);
  console.log("Handling is follower request:", request);
  const response = await UserInfoService.getIsFollowerStatus(
    request.authToken,
    request.user,
    request.selectedUser
  );
  return response;
}

async function handleFollowUser(
  requestInfo: ApiRequestInfo
): Promise<FollowResponse> {
  const request: FollowRequest = JSON.parse(requestInfo.body);
  console.log("Handling follow user request:", request);
  const response = await UserInfoService.follow(
    request.authToken,
    request.userToFollow
  );
  return response;
}

async function handleUnfollowUser(
  requestInfo: ApiRequestInfo
): Promise<UnfollowResponse> {
  const request: UnfollowRequest = JSON.parse(requestInfo.body);
  console.log("Handling unfollow user request:", request);
  const response = await UserInfoService.unfollow(
    request.authToken,
    request.userToUnfollow
  );
  return response;
}
