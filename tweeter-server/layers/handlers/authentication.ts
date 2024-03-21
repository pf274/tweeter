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
  return {
    authToken: response.authToken.dto,
    user: response.user.dto,
  };
}

async function handleRegister(
  requestInfo: ApiRequestInfo
): Promise<RegisterResponse> {
  const request: RegisterRequest = JSON.parse(requestInfo.body);
  console.log("Handling register request:", request);
  const imageBytes: Uint8Array = Buffer.from(
    request.imageStringBase64,
    "base64"
  );
  const response = await AuthenticationService.register(
    request.alias,
    request.password,
    request.firstName,
    request.lastName,
    imageBytes
  );
  return {
    authToken: response.authToken.dto,
    user: response.user.dto,
  };
}
