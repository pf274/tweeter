import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "tweeter-shared";
import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { AuthenticationService } from "../services/authenticationService";

module.exports.handler = basicApiHandler("authentication", [
  ApiRoute.post("/auth/login", handleLogin),
  ApiRoute.post("/auth/register", handleRegister),
]);

async function handleLogin(
  requestInfo: ApiRequestInfo
): Promise<LoginResponse> {
  const request: LoginRequest = JSON.parse(requestInfo.body);
  console.log("Handling login request:", request);
  const response = await AuthenticationService.login(
    request.username,
    request.password
  );
  return response;
}

async function handleRegister(
  requestInfo: ApiRequestInfo
): Promise<RegisterResponse> {
  const request: RegisterRequest = JSON.parse(requestInfo.body);
  console.log("Handling register request:", request);
  const response = await AuthenticationService.register(
    request.alias,
    request.password,
    request.firstName,
    request.lastName,
    request.imageBytes
  );
  return response;
}
