import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";

module.exports.handler = basicApiHandler("authentication", [
  ApiRoute.post("/auth/login", handleLogin),
  ApiRoute.post("/auth/register", handleRegister),
]);

async function handleLogin(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling login request:", requestInfo);
  return { message: "Login successful" };
}

async function handleRegister(requestInfo: ApiRequestInfo): Promise<any> {
  console.log("Handling register request:", requestInfo);
  return { message: "Login successful" };
}
