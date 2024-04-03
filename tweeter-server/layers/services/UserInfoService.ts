import { ServiceError } from "../../utils/ServiceError";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { User } from "../../utils/shared-models/domain/User";
import { Service } from "./Service";

export class UserInfoService extends Service {
  public static async getUserByAlias(
    authToken: AuthToken,
    alias: string
  ): Promise<{ user: User | null }> {
    const isValidToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const user = await this.userFactory.getUser(alias);
    return { user };
  }

  public static async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<{ count: number }> {
    const isValidToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const count = await this.userFactory.getFollowersCount(user.alias);
    return { count };
  }

  public static async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<{ count: number }> {
    const isValidToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const count = await this.userFactory.getFolloweesCount(user.alias);
    return { count };
  }

  public static async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<{ isFollower: boolean }> {
    const isValidToken = await this.authTokenFactory.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const isFollower = await this.followsFactory.isFollower(user.alias, selectedUser.alias);
    return { isFollower };
  }

  public static async follow(
    authToken: AuthToken,
    currentUser: User,
    userToFollow: User
  ): Promise<{ followersCount: number; followeesCount: number }> {
    await this.userFactory.incrementFolloweesCount(userToFollow.alias);
    await this.followsFactory.follow(currentUser.alias, userToFollow.alias);
    const { count: followersCount } = await this.getFollowersCount(authToken, userToFollow);
    const { count: followeesCount } = await this.getFolloweesCount(authToken, userToFollow);
    return { followersCount, followeesCount };
  }

  public static async unfollow(
    authToken: AuthToken,
    currentUser: User,
    userToUnfollow: User
  ): Promise<{ followersCount: number; followeesCount: number }> {
    await this.followsFactory.unfollow(currentUser.alias, userToUnfollow.alias);
    await this.userFactory.decrementFolloweesCount(userToUnfollow.alias);
    const { count: followersCount } = await this.getFollowersCount(authToken, userToUnfollow);
    const { count: followeesCount } = await this.getFolloweesCount(authToken, userToUnfollow);
    return { followersCount, followeesCount };
  }
}
