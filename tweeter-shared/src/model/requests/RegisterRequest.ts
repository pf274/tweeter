import { TweeterRequest } from "./TweeterRequest";

export interface RegisterRequest extends TweeterRequest {
  readonly alias: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly imageBytes: Uint8Array;
}
