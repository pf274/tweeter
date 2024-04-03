import { Buffer } from "buffer";
import { AuthToken, LoginResponse, LogoutRequest, RegisterResponse, User } from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class AuthenticationService {
  public async register(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageBytes: Uint8Array
  ): Promise<[User, AuthToken]> {
    const imageStringBase64 = Buffer.from(imageBytes).toString("base64");

    const response: RegisterResponse = await ServerFacade.register({
      alias,
      password,
      firstName,
      lastName,
      imageStringBase64,
    });

    if (!response.user) {
      throw new Error("User not found.");
    } else if (!response.authToken) {
      throw new Error("Auth token not found.");
    }

    return [User.fromDTO(response.user), AuthToken.fromDTO(response.authToken)];
  }

  public async login(alias: string, password: string): Promise<[User, AuthToken]> {
    const response: LoginResponse = await ServerFacade.login({
      username: alias,
      password,
    });

    if (!response.user) {
      throw new Error("User not found.");
    } else if (!response.authToken) {
      throw new Error("Auth token not found.");
    }

    return [User.fromDTO(response.user), AuthToken.fromDTO(response.authToken)];
  }

  public async logout(authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message.
    const logoutRequest: LogoutRequest = {
      authToken: authToken.dto,
    };
    await ServerFacade.logout(logoutRequest);
  }
}
