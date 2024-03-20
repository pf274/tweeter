import { AuthTokenDTO } from "../domain/AuthToken";
import { UserDTO } from "../domain/User";
import { TweeterRequest } from "./TweeterRequest";

export interface FollowRequest extends TweeterRequest {
  readonly authToken: AuthTokenDTO;
  readonly userToFollow: UserDTO;
}
