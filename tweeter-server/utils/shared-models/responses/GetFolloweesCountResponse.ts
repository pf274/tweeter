import { TweeterResponse } from "./TweeterResponse";

export interface GetFolloweesCountResponse extends TweeterResponse {
  readonly count: number;
}
