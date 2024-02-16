import { AuthToken, User, FakeData } from "tweeter-shared";

export class UserService {
  public async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowersCount(user);
  }

  public async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweesCount(user);
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }

  public async follow(
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

  public async unfollow(
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

  public async getUserByAlias(
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> {
    // TODO: Move this to UserInfoService.ts
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  }
}