import { AuthTokenDTO } from "../domain/AuthToken";
import { UserDTO } from "../domain/User";
import { TweeterResponse } from "./TweeterResponse";

export interface RegisterResponse extends TweeterResponse {
  readonly user: UserDTO | null;
  readonly authToken: AuthTokenDTO | null;
}
