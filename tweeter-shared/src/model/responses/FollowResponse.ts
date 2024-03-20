import { TweeterResponse } from "./TweeterResponse";

export interface FollowResponse extends TweeterResponse {
  readonly followersCount: number;
  readonly followeesCount: number;
}
