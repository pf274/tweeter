import { FakeData } from "../../utils/FakeData";
import { ServiceError } from "../../utils/ServiceError";
import { User, AuthToken } from "tweeter-shared";

export class AuthenticationService {
  static async register(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageBytes: Uint8Array
  ) {
    let user = FakeData.instance.firstUser;
    let authToken = FakeData.instance.authToken;

    if (user === null) {
      throw new ServiceError(400, "Invalid registration");
    }

    return [user, authToken];
  }

  static async login(alias: string, password: string) {
    const user = FakeData.instance.firstUser;
    let authToken = FakeData.instance.authToken;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, authToken];
  }
}
