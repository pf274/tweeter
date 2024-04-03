import { ServiceError } from "../../utils/ServiceError";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { Status } from "../../utils/shared-models/domain/Status";
import { Service } from "./Service";

export class StatusService extends Service {
  static async postStatus(authToken: AuthToken, status: Status): Promise<{ successful: boolean }> {
    const validToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const allFollowers = [];
    let lastKey = undefined;
    do {
      const { users: followers, lastAlias } = await this.followsFactory.getFollowers(
        status.user.alias,
        100,
        lastKey
      );
      allFollowers.push(...followers);
      lastKey = lastAlias;
    } while (lastKey);
    await this.feedFactory.postStatus(
      allFollowers.map((user) => user.alias),
      status
    );
    await this.storyFactory.postStatus(status.user.alias, status);
    return { successful: true };
  }
}
