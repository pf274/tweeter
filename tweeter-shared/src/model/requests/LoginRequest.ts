import { LoginResponse } from "../responses/LoginResponse";
import { TweeterResponse, TweeterResponseParams } from "../responses/TweeterResponse";
import { TweeterRequest } from "./TweeterRequest";

export class LoginRequest extends TweeterRequest {
  constructor(username: string, password: string) {
    super({
      queryParameters: {},
      pathParameters: {},
      body: { username, password },
      method: "POST",
      endpoint: "/service/login",
    });
  }

  isValid(): boolean {
    return this.body.username.length > 0 && this.body.password.length > 0;
  }

  protected responseBuilder(params: TweeterResponseParams): TweeterResponse {
    return new LoginResponse(params.statusCode, params.body);
  }
}
