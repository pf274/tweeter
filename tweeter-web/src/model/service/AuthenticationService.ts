import { Buffer } from "buffer";
import {
  AuthToken,
  LoginResponse,
  RegisterResponse,
  User,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class AuthenticationService {
  public async register(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageBytes: Uint8Array
  ): Promise<[User | null, AuthToken | null]> {
    const imageStringBase64 = Buffer.from(imageBytes).toString("base64");

    const response: RegisterResponse = await ServerFacade.register({
      alias,
      password,
      firstName,
      lastName,
      imageStringBase64,
    });

    return [
      response.user ? User.fromDTO(response.user) : null,
      response.authToken ? AuthToken.fromDTO(response.authToken) : null,
    ];
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User | null, AuthToken | null]> {
    const response: LoginResponse = await ServerFacade.login({
      username: alias,
      password,
    });

    return [
      response.user ? User.fromDTO(response.user) : null,
      response.authToken ? AuthToken.fromDTO(response.authToken) : null,
    ];
  }

  public async logout(authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message.
    // TODO: Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }
}
