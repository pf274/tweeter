import { AuthTokenDTO } from "../domain/AuthToken";
import { UserDTO } from "../domain/User";
import { TweeterRequest } from "./TweeterRequest";

export interface UnfollowRequest extends TweeterRequest {
  readonly authToken: AuthTokenDTO;
  readonly userToUnfollow: UserDTO;
}
