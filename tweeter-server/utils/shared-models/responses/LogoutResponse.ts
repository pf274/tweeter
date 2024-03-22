import { TweeterResponse } from "./TweeterResponse";

export interface LogoutResponse extends TweeterResponse {
  readonly successful: boolean;
}
