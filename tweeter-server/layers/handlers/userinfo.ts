import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";

module.exports.handler = basicApiHandler("userinfo", [
  ApiRoute.get("/user/get", handleGetUserByAlias),
  ApiRoute.get("/user/followersCount", handleGetFollowersCount),
  ApiRoute.get("/user/followeesCount", handleGetFolloweesCount),
  ApiRoute.get("/user/isFollower", handleIsFollower),
  ApiRoute.post("/user/follow", handleFollowUser),
  ApiRoute.post("/user/unfollow", handleUnfollowUser),
]);

async function handleGetUserByAlias(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling get user by alias request:", requestInfo);
  return { message: "Get user by alias successful" };
}

async function handleGetFollowersCount(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling get followers count request:", requestInfo);
  return { message: "Get followers count successful" };
}

async function handleGetFolloweesCount(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling get followees count request:", requestInfo);
  return { message: "Get followees count successful" };
}

async function handleIsFollower(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling is follower request:", requestInfo);
  return { message: "Is follower successful" };
}

async function handleFollowUser(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling follow user request:", requestInfo);
  return { message: "Follow user successful" };
}

async function handleUnfollowUser(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling unfollow user request:", requestInfo);
  return { message: "Unfollow user successful" };
}
