import { ServiceError } from "../../utils/ServiceError";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { Status } from "../../utils/shared-models/domain/Status";
import { Service } from "./Service";

export class StatusService extends Service {
  static async postStatus(authToken: AuthToken, status: Status): Promise<{ successful: boolean }> {
    const validToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const allFollowers = [];
    let lastKey = undefined;
    do {
      const { usersAliases, lastAlias } = await this.db.followsDAO.getFollowers(
        status.user.alias,
        100,
        lastKey
      );
      allFollowers.push(...usersAliases);
      lastKey = lastAlias;
    } while (lastKey);
    await this.db.feedDAO.postStatus(allFollowers, status);
    await this.db.storyDAO.postStatus(status.user.alias, status);
    return { successful: true };
  }
}
