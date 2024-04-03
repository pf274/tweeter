import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { UserInfoService } from "../services/UserInfoService";
import { GetUserByAliasRequest } from "../../utils/shared-models/requests/GetUserByAliasRequest";
import { GetUserByAliasResponse } from "../../utils/shared-models/responses/GetUserByAliasResponse";
import { GetFollowersCountRequest } from "../../utils/shared-models/requests/GetFollowersCountRequest";
import { GetFollowersCountResponse } from "../../utils/shared-models/responses/GetFollowersCountResponse";
import { GetFolloweesCountRequest } from "../../utils/shared-models/requests/GetFolloweesCountRequest";
import { GetFolloweesCountResponse } from "../../utils/shared-models/responses/GetFolloweesCountResponse";
import { GetIsFollowerRequest } from "../../utils/shared-models/requests/GetIsFollowerRequest";
import { GetIsFollowerResponse } from "../../utils/shared-models/responses/GetIsFollowerResponse";
import { FollowRequest } from "../../utils/shared-models/requests/FollowRequest";
import { FollowResponse } from "../../utils/shared-models/responses/FollowResponse";
import { UnfollowRequest } from "../../utils/shared-models/requests/UnfollowRequest";
import { UnfollowResponse } from "../../utils/shared-models/responses/UnfollowResponse";
import { AuthToken, AuthTokenDTO } from "../../utils/shared-models/domain/AuthToken";
import { User, UserDTO } from "../../utils/shared-models/domain/User";
import { Status, StatusDTO } from "../../utils/shared-models/domain/Status";

module.exports.handler = basicApiHandler("userinfo", [
  ApiRoute.get("/user/get", handleGetUserByAlias),
  ApiRoute.get("/user/followersCount", handleGetFollowersCount),
  ApiRoute.get("/user/followeesCount", handleGetFolloweesCount),
  ApiRoute.get("/user/isFollower", handleIsFollower),
  ApiRoute.post("/user/follow", handleFollowUser),
  ApiRoute.post("/user/unfollow", handleUnfollowUser),
]);

async function handleGetUserByAlias(requestInfo: ApiRequestInfo): Promise<GetUserByAliasResponse> {
  const request: GetUserByAliasRequest = {
    authToken: JSON.parse(requestInfo.queryParameters.authToken) as AuthTokenDTO,
    alias: requestInfo.queryParameters.alias,
  };
  console.log("Handling get user by alias request:", request);
  const response = await UserInfoService.getUserByAlias(
    AuthToken.fromDTO(request.authToken),
    request.alias
  );
  return {
    user: response.user ? response.user?.dto : null,
  };
}

async function handleGetFollowersCount(
  requestInfo: ApiRequestInfo
): Promise<GetFollowersCountResponse> {
  const request: GetFollowersCountRequest = {
    authToken: JSON.parse(requestInfo.queryParameters.authToken) as AuthTokenDTO,
    user: JSON.parse(requestInfo.queryParameters.user) as UserDTO,
  };
  console.log("Handling get followers count request:", request);
  const response = await UserInfoService.getFollowersCount(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user)
  );
  return {
    count: response.count,
  };
}

async function handleGetFolloweesCount(
  requestInfo: ApiRequestInfo
): Promise<GetFolloweesCountResponse> {
  const request: GetFolloweesCountRequest = {
    authToken: JSON.parse(requestInfo.queryParameters.authToken) as AuthTokenDTO,
    user: JSON.parse(requestInfo.queryParameters.user) as UserDTO,
  };
  console.log("Handling get followees count request:", request);
  const response = await UserInfoService.getFolloweesCount(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user)
  );
  return response;
}

async function handleIsFollower(requestInfo: ApiRequestInfo): Promise<GetIsFollowerResponse> {
  const request: GetIsFollowerRequest = {
    authToken: JSON.parse(requestInfo.queryParameters.authToken) as AuthTokenDTO,
    user: JSON.parse(requestInfo.queryParameters.user) as UserDTO,
    selectedUser: JSON.parse(requestInfo.queryParameters.selectedUser) as UserDTO,
  };
  console.log("Handling is follower request:", request);
  const response = await UserInfoService.getIsFollowerStatus(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    User.fromDTO(request.selectedUser)
  );
  return {
    isFollower: response.isFollower,
  };
}

async function handleFollowUser(requestInfo: ApiRequestInfo): Promise<FollowResponse> {
  const request: FollowRequest = JSON.parse(requestInfo.body);
  console.log("Handling follow user request:", request);
  const response = await UserInfoService.follow(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    User.fromDTO(request.userToFollow)
  );
  return response;
}

async function handleUnfollowUser(requestInfo: ApiRequestInfo): Promise<UnfollowResponse> {
  const request: UnfollowRequest = JSON.parse(requestInfo.body);
  console.log("Handling unfollow user request:", request);
  const response = await UserInfoService.unfollow(
    AuthToken.fromDTO(request.authToken),
    User.fromDTO(request.user),
    User.fromDTO(request.userToUnfollow)
  );
  return response;
}
