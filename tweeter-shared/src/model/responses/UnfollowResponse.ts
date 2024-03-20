import { TweeterResponse } from "./TweeterResponse";

export interface UnfollowResponse extends TweeterResponse {
  readonly followersCount: number;
  readonly followeesCount: number;
}
