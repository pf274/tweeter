import { FakeData } from "../../utils/FakeData";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { User } from "../../utils/shared-models/domain/User";

export class UserInfoService {
  public static async getUserByAlias(
    authToken: AuthToken,
    alias: string
  ): Promise<{ user: User | null }> {
    const user = FakeData.instance.findUserByAlias(alias);
    return { user };
  }

  public static async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<{ count: number }> {
    // TODO: Replace with the result of calling server
    const count = await FakeData.instance.getFollowersCount(user);
    return { count };
  }

  public static async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<{ count: number }> {
    const count = await FakeData.instance.getFolloweesCount(user);
    return { count };
  }

  public static async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<{ isFollower: boolean }> {
    const isFollower = FakeData.instance.isFollower();
    return { isFollower };
  }

  public static async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<{ followersCount: number; followeesCount: number }> {
    const { count: followersCount } = await this.getFollowersCount(
      authToken,
      userToFollow
    );
    const { count: followeesCount } = await this.getFolloweesCount(
      authToken,
      userToFollow
    );

    return { followersCount, followeesCount };
  }

  public static async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<{ followersCount: number; followeesCount: number }> {
    const { count: followersCount } = await this.getFollowersCount(
      authToken,
      userToUnfollow
    );
    const { count: followeesCount } = await this.getFolloweesCount(
      authToken,
      userToUnfollow
    );

    return { followersCount, followeesCount };
  }
}
