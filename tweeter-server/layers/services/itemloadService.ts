import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { User } from "../../utils/shared-models/domain/User";
import { Status } from "../../utils/shared-models/domain/Status";
import { Service } from "./Service";
import { ServiceError } from "../../utils/ServiceError";

export class ItemLoadService extends Service {
  public static async loadMoreFollowers(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<{ users: User[]; hasMore: boolean }> {
    const validToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { usersAliases, lastAlias } = await this.db.followsDAO.getFollowers(
      user.alias,
      pageSize,
      lastItem?.alias
    );
    const users = await this.db.userDAO.getUsers(usersAliases);
    const filteredUsers: User[] = users.filter((user) => user !== null) as User[];
    return { users: filteredUsers, hasMore: !!lastAlias };
  }

  public static async loadMoreFollowees(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<{ users: User[]; hasMore: boolean }> {
    const validToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { usersAliases, lastAlias } = await this.db.followsDAO.getFollowees(
      user.alias,
      pageSize,
      lastItem?.alias
    );
    const users = await this.db.userDAO.getUsers(usersAliases);
    const filteredUsers: User[] = users.filter((user) => user !== null) as User[];
    return { users: filteredUsers, hasMore: !!lastAlias };
  }

  static async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<{ statusItems: Status[]; hasMore: boolean }> {
    const validToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { feedItems, lastFeedItem } = await this.db.feedDAO.getFeedItems(
      user.alias,
      pageSize,
      lastItem ? lastItem : undefined
    );
    return { statusItems: feedItems, hasMore: !!lastFeedItem };
  }

  static async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<{ statusItems: Status[]; hasMore: boolean }> {
    const validToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { storyItems, lastStoryItem } = await this.db.storyDAO.getStoryItems(
      user.alias,
      pageSize,
      lastItem ? lastItem : undefined
    );
    return { statusItems: storyItems, hasMore: !!lastStoryItem };
  }
}
