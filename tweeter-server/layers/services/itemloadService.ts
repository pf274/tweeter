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
    const validToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { users, lastAlias } = await this.followsFactory.getFollowers(
      user.alias,
      pageSize,
      lastItem ? lastItem.alias : undefined
    );
    return { users, hasMore: !!lastAlias };
  }

  public static async loadMoreFollowees(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<{ users: User[]; hasMore: boolean }> {
    const validToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { users, lastAlias } = await this.followsFactory.getFollowees(
      user.alias,
      pageSize,
      lastItem?.alias
    );
    return { users, hasMore: !!lastAlias };
  }

  static async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<{ statusItems: Status[]; hasMore: boolean }> {
    const validToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { feedItems, lastFeedItem } = await this.feedFactory.getFeedItems(
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
    const validToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!validToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const { storyItems, lastStoryItem } = await this.storyFactory.getStoryItems(
      user.alias,
      pageSize,
      lastItem ? lastItem : undefined
    );
    return { statusItems: storyItems, hasMore: !!lastStoryItem };
  }
}
