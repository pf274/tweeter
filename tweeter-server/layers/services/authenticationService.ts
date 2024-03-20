import { FakeData } from "../../utils/FakeData";
import { ServiceError } from "../../utils/ServiceError";
import { UserDTO, AuthTokenDTO } from "tweeter-shared";

export class AuthenticationService {
  static async register(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageBytes: Uint8Array
  ): Promise<{ user: UserDTO; authToken: AuthTokenDTO }> {
    let user = FakeData.instance.firstUser;
    let authToken = FakeData.instance.authToken;

    if (user === null) {
      throw new ServiceError(400, "Invalid registration");
    }

    return { user: user.dto, authToken: authToken.dto };
  }

  static async login(
    alias: string,
    password: string
  ): Promise<{ user: UserDTO; authToken: AuthTokenDTO }> {
    const user = FakeData.instance.firstUser;
    let authToken = FakeData.instance.authToken;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return { user: user.dto, authToken: authToken.dto };
  }
}
