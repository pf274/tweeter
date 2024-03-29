import { FakeData } from "../../utils/FakeData";
import { ServiceError } from "../../utils/ServiceError";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { User } from "../../utils/shared-models/domain/User";

export class AuthenticationService {
  static async register(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageBytes: Uint8Array
  ): Promise<{ user: User; authToken: AuthToken }> {
    let user = FakeData.instance.firstUser;
    let authToken = FakeData.instance.authToken;

    if (user === null) {
      throw new ServiceError(400, "Invalid registration");
    }

    return { user, authToken };
  }

  static async login(
    alias: string,
    password: string
  ): Promise<{ user: User; authToken: AuthToken }> {
    const user = FakeData.instance.firstUser;
    let authToken = FakeData.instance.authToken;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return { user, authToken };
  }
}
