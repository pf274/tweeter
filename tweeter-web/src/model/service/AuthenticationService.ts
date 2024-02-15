import { Buffer } from "buffer";
import { AuthToken, FakeData, User } from "tweeter-shared";

export class AuthenticationService {
  public async register(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageBytes: Uint8Array
  ): Promise<[User, AuthToken]> {
    // Implementation not shown
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    let imageStringBase64: string = Buffer.from(imageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.firstUser;
    let authToken = FakeData.instance.authToken;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, authToken];
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken];
  }

  public async logout(authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message.
    // TODO: Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }
}
