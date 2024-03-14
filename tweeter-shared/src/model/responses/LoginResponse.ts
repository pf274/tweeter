import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";
import { AuthenticateResponse } from "./AuthenticateResponse";

export class LoginResponse extends AuthenticateResponse {
  public user: User;
  public authToken: AuthToken;
  constructor(statusCode: number, body: any) {
    super(statusCode, body);
    this.user = new User(
      body.user.firstName,
      body.user.lastName,
      body.user.alias,
      body.user.imageURL
    );
    this.authToken = new AuthToken(body.token, Date.now());
  }

  isValid(): boolean {
    return Boolean(this.statusCode === 200 && this.user && this.authToken);
  }
}
