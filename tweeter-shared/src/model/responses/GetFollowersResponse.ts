import { UserDTO } from "../domain/User";
import { TweeterResponse } from "./TweeterResponse";

export interface GetFollowersResponse extends TweeterResponse {
  readonly users: UserDTO[];
  readonly hasMore: boolean;
}
