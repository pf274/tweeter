import { UserDTO } from "../domain/User";
import { TweeterResponse } from "./TweeterResponse";

export interface GetUserByAliasResponse extends TweeterResponse {
  user: UserDTO | null;
}
