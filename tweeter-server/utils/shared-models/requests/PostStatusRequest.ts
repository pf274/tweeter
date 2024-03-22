import { AuthTokenDTO } from "../domain/AuthToken";
import { StatusDTO } from "../domain/Status";
import { UserDTO } from "../domain/User";
import { TweeterRequest } from "./TweeterRequest";

export interface PostStatusRequest extends TweeterRequest {
  readonly authToken: AuthTokenDTO;
  readonly status: StatusDTO;
}
