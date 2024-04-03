import { ServiceError } from "../../utils/ServiceError";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { User } from "../../utils/shared-models/domain/User";
import { Service } from "./Service";

export class AuthenticationService extends Service {
  static async register(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageBytes: Uint8Array
  ): Promise<{ user: User; authToken: AuthToken }> {
    const formattedAlias = alias.startsWith("@") ? alias : `@${alias}`;
    const prevUser = await this.userFactory.getUser(formattedAlias);
    if (prevUser) {
      throw new ServiceError(400, "Alias already taken");
    }
    const imageBuffer = Buffer.from(imageBytes);
    const imageURL = await this.imageFactory.uploadImage(imageBuffer, formattedAlias);
    const user = await this.userFactory.saveUser(
      formattedAlias,
      password,
      firstName,
      lastName,
      imageURL
    );
    const authToken = await this.authTokenFactory.createAuthToken();
    return { user, authToken };
  }

  static async login(
    alias: string,
    password: string
  ): Promise<{ user: User; authToken: AuthToken }> {
    const formattedAlias = alias.startsWith("@") ? alias : `@${alias}`;
    const user = await this.userFactory.checkCredentials(formattedAlias, password);
    if (!user) {
      throw new ServiceError(400, "Invalid alias or password");
    }
    const authToken = await this.authTokenFactory.createAuthToken();
    return { user, authToken };
  }
}
