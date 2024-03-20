import { AuthTokenDTO } from "../domain/AuthToken";
import { UserDTO } from "../domain/User";
import { TweeterRequest } from "./TweeterRequest";

export interface GetFollowersCountRequest extends TweeterRequest {
  readonly authToken: AuthTokenDTO;
  readonly user: UserDTO;
}
