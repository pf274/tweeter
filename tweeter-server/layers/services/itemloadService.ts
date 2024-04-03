import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { User } from "../../utils/shared-models/domain/User";
import { Status } from "../../utils/shared-models/domain/Status";
import { FakeData } from "../../utils/FakeData";
import { Service } from "./Service";

export class ItemLoadService extends Service {
  public static async loadMoreFollowers(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<{ users: User[]; hasMore: boolean }> {
    await this.authTokenFactory.verifyAuthToken(authToken);
    const { items, lastItem } = await this.followsFactory.getFollowers(blah);
    const [users, hasMore] = FakeData.instance.getPageOfUsers(
      lastItem ? lastItem : null,
      pageSize,
      user
    );
    return { users, hasMore };
  }

  public static async loadMoreFollowees(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<{ users: User[]; hasMore: boolean }> {
    const [users, hasMore] = FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
    return { users, hasMore };
  }

  static async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<{ statusItems: Status[]; hasMore: boolean }> {
    const [feedItems, hasMore] = FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    return { statusItems: feedItems, hasMore };
  }

  static async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<{ statusItems: Status[]; hasMore: boolean }> {
    const [statusItems, hasMore] = FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    return { statusItems, hasMore };
  }
}
