import { TweeterRequest } from "./TweeterRequest";

export interface LoginRequest extends TweeterRequest {
  readonly username: string;
  readonly password: string;
}
