import { TweeterResponse } from "./TweeterResponse";

export interface PostStatusResponse extends TweeterResponse {
  readonly successful: boolean;
}
