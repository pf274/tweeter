import { User, AuthTokenDTO, UserDTO, StatusDTO, Status } from "tweeter-shared";
import { FakeData } from "../../utils/FakeData";

export class ItemLoadService {
  public static async loadMoreFollowers(
    authToken: AuthTokenDTO,
    user: UserDTO,
    pageSize: number,
    lastItem: UserDTO | null
  ): Promise<{ users: UserDTO[]; hasMore: boolean }> {
    const [users, hasMore] = FakeData.instance.getPageOfUsers(
      lastItem ? User.fromDTO(lastItem) : null,
      pageSize,
      User.fromDTO(user)
    );
    return { users: users.map((user) => user.dto), hasMore };
  }

  public static async loadMoreFollowees(
    authToken: AuthTokenDTO,
    user: UserDTO,
    pageSize: number,
    lastItem: UserDTO | null
  ): Promise<{ users: UserDTO[]; hasMore: boolean }> {
    const [users, hasMore] = FakeData.instance.getPageOfUsers(
      lastItem ? User.fromDTO(lastItem) : null,
      pageSize,
      User.fromDTO(user)
    );
    return { users: users.map((user) => user.dto), hasMore };
  }

  static async loadMoreFeedItems(
    authToken: AuthTokenDTO,
    user: UserDTO,
    pageSize: number,
    lastItem: StatusDTO | null
  ): Promise<{ statusItems: StatusDTO[]; hasMore: boolean }> {
    const [feedItems, hasMore] = FakeData.instance.getPageOfStatuses(
      lastItem ? Status.fromDTO(lastItem) : null,
      pageSize
    );
    return { statusItems: feedItems.map((status) => status.dto), hasMore };
  }

  static async loadMoreStoryItems(
    authToken: AuthTokenDTO,
    user: UserDTO,
    pageSize: number,
    lastItem: StatusDTO | null
  ): Promise<{ statusItems: StatusDTO[]; hasMore: boolean }> {
    const [statusItems, hasMore] = FakeData.instance.getPageOfStatuses(
      lastItem ? Status.fromDTO(lastItem) : null,
      pageSize
    );
    return { statusItems: statusItems.map((status) => status.dto), hasMore };
  }
}
