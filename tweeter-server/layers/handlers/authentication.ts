import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { AuthenticationService } from "../services/authenticationService";

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
  // const result = await AuthenticationService.register();
  return { message: "Register successful" };
}
