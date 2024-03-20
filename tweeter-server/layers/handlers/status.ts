import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { StatusService } from "../services/StatusService";
import { PostStatusRequest, PostStatusResponse } from "tweeter-shared";

module.exports.handler = basicApiHandler("status", [
  ApiRoute.post("/status", handlePostStatus),
]);

async function handlePostStatus(
  requestInfo: ApiRequestInfo
): Promise<PostStatusResponse> {
  const request: PostStatusRequest = JSON.parse(requestInfo.body);
  console.log("Handling post status request:", request);
  await StatusService.postStatus(request.authToken, request.status);
  return { successful: true };
}
