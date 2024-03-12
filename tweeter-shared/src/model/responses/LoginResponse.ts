import { AuthenticateResponse } from "./AuthenticateResponse";

export class LoginResponse extends AuthenticateResponse {
  constructor(statusCode: number, body: any) {
    super(statusCode, body);
  }

  isValid(): boolean {
    return this.statusCode === 200 && this.body.token.length > 0;
  }
}
