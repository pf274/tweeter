import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";

module.exports.handler = basicApiHandler("itemload", [
  ApiRoute.get("/items/followers", handleGetFollowers),
  ApiRoute.get("/items/followees", handleGetFollowees),
  ApiRoute.get("/items/feed", handleGetFeed),
  ApiRoute.get("/items/stories", handleGetStories),
]);

async function handleGetFollowers(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling get followers request:", requestInfo);
  return { message: "Get followers successful" };
}

async function handleGetFollowees(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling get followees request:", requestInfo);
  return { message: "Get followees successful" };
}

async function handleGetFeed(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling get feed request:", requestInfo);
  return { message: "Get feed successful" };
}

async function handleGetStories(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling get stories request:", requestInfo);
  return { message: "Get stories successful" };
}
