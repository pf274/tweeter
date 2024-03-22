import { LoginRequest } from "../../utils/shared-models/requests/LoginRequest";
import { LoginResponse } from "../../utils/shared-models/responses/LoginResponse";
import { RegisterRequest } from "../../utils/shared-models/requests/RegisterRequest";
import { RegisterResponse } from "../../utils/shared-models/responses/RegisterResponse";
import { LogoutRequest } from "../../utils/shared-models/requests/LogoutRequest";
import { LogoutResponse } from "../../utils/shared-models/responses/LogoutResponse";
import { ApiRequestInfo, ApiRoute } from "../../types/ApiRoutes";
import { basicApiHandler } from "../../utils/ApiHelpers";
import { AuthenticationService } from "../services/authenticationService";

module.exports.handler = basicApiHandler("authentication", [
  ApiRoute.post("/auth/login", handleLogin),
  ApiRoute.post("/auth/register", handleRegister),
  ApiRoute.post("/auth/logout", handleLogout),
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

async function handleLogout(
  requestInfo: ApiRequestInfo
): Promise<LogoutResponse> {
  console.log("Handling logout request:", requestInfo);
  const request: LogoutRequest = JSON.parse(requestInfo.body);
  // await AuthenticationService.logout(requestInfo.authToken);
  return { successful: true };
}
