import { TweeterResponse } from "./TweeterResponse";

export interface GetFollowersCountResponse extends TweeterResponse {
  readonly count: number;
}
