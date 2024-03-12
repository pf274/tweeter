import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";

module.exports.handler = basicApiHandler("status", [ApiRoute.post("/status", handlePostStatus)]);

async function handlePostStatus(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling post status request:", requestInfo);
  return { message: "Post status successful" };
}
