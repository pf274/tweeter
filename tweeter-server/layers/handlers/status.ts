import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { StatusService } from "../services/StatusService";
import { PostStatusRequest } from "../../utils/shared-models/requests/PostStatusRequest";
import { PostStatusResponse } from "../../utils/shared-models/responses/PostStatusResponse";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { Status } from "../../utils/shared-models/domain/Status";

module.exports.handler = basicApiHandler("status", [
  ApiRoute.post("/status", handlePostStatus),
]);

async function handlePostStatus(
  requestInfo: ApiRequestInfo
): Promise<PostStatusResponse> {
  const request: PostStatusRequest = JSON.parse(requestInfo.body);
  console.log("Handling post status request:", request);
  const response = await StatusService.postStatus(
    AuthToken.fromDTO(request.authToken),
    Status.fromDTO(request.status)
  );
  return response;
}
