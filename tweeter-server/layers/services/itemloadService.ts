import { User, AuthToken, Status } from "tweeter-shared";
import { FakeData } from "../../utils/FakeData";

export class ItemLoadService {
  public static async loadMoreFollowers(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<{ users: User[]; hasMore: boolean }> {
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
    const [users, hasMore] = FakeData.instance.getPageOfUsers(
      lastItem,
      pageSize,
      user
    );
    return { users, hasMore };
  }

  static async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<{ statusItems: Status[]; hasMore: boolean }> {
    const [feedItems, hasMore] = FakeData.instance.getPageOfStatuses(
      lastItem,
      pageSize
    );
    return { statusItems: feedItems, hasMore };
  }

  static async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<{ statusItems: Status[]; hasMore: boolean }> {
    const [statusItems, hasMore] = FakeData.instance.getPageOfStatuses(
      lastItem,
      pageSize
    );
    return { statusItems, hasMore };
  }
}
