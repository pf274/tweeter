import { AuthTokenDTO } from "../domain/AuthToken";
import { TweeterRequest } from "./TweeterRequest";

export interface GetUserByAliasRequest extends TweeterRequest {
  readonly authToken: AuthTokenDTO;
  readonly alias: string;
}
