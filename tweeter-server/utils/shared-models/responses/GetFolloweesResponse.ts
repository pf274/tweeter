import { UserDTO } from "../domain/User";
import { TweeterResponse } from "./TweeterResponse";

export interface GetFolloweesResponse extends TweeterResponse {
  readonly users: UserDTO[];
  readonly hasMore: boolean;
}
