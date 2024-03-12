import { TweeterResponse } from "./TweeterResponse";

export abstract class AuthenticateResponse extends TweeterResponse {
  constructor(statusCode: number, body: any) {
    super({ statusCode, body });
  }
}
