import { AuthToken, User } from "tweeter-shared";
import { FakeData } from "../../utils/FakeData";

export class UserInfoService {
  public static async getUserByAlias(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    return FakeData.instance.findUserByAlias(alias);
  }

  public static async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowersCount(user);
  }

  public static async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweesCount(user);
  }

  public static async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }

  public static async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    // Pause so we can see the following message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followersCount = await this.getFollowersCount(
      authToken,
      userToFollow
    );
    const followeesCount = await this.getFolloweesCount(
      authToken,
      userToFollow
    );

    return [followersCount, followeesCount];
  }

  public static async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    // Pause so we can see the unfollowing message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followersCount = await this.getFollowersCount(
      authToken,
      userToUnfollow
    );
    const followeesCount = await this.getFolloweesCount(
      authToken,
      userToUnfollow
    );

    return [followersCount, followeesCount];
  }
}
