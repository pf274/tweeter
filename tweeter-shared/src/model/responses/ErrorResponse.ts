import { TweeterResponse } from "./TweeterResponse";

export interface ErrorResponse extends TweeterResponse {
  readonly statusCode: number;
  readonly message: string;
}
