import { TweeterResponse } from "./TweeterResponse";

export class ErrorResponse extends TweeterResponse {
  constructor(statusCode: number, message: string) {
    super({ statusCode, body: { message } });
  }

  isValid(): boolean {
    return this.statusCode >= 400;
  }
}
