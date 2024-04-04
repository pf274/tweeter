import { ServiceError } from "../../utils/ServiceError";
import { AuthToken } from "../../utils/shared-models/domain/AuthToken";
import { User } from "../../utils/shared-models/domain/User";
import { Service } from "./Service";

export class UserInfoService extends Service {
  public static async getUserByAlias(
    authToken: AuthToken,
    alias: string
  ): Promise<{ user: User | null }> {
    const isValidToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const user = await this.db.userDAO.getUser(alias);
    return { user };
  }

  public static async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<{ count: number }> {
    const isValidToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const count = await this.db.userDAO.getFollowersCount(user.alias);
    return { count };
  }

  public static async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<{ count: number }> {
    const isValidToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const count = await this.db.userDAO.getFolloweesCount(user.alias);
    return { count };
  }

  public static async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<{ isFollower: boolean }> {
    const isValidToken = await this.db.authTokenDAO.validateAuthToken(authToken);
    if (!isValidToken) {
      throw new ServiceError(403, "Insufficient rights");
    }
    const isFollower = await this.db.followsDAO.isFollower(user.alias, selectedUser.alias);
    return { isFollower };
  }

  public static async follow(
    authToken: AuthToken,
    currentUser: User,
    userToFollow: User
  ): Promise<{ followersCount: number; followeesCount: number }> {
    await this.db.userDAO.incrementFolloweesCount(userToFollow.alias);
    await this.db.followsDAO.follow(currentUser.alias, userToFollow.alias);
    const { count: followersCount } = await this.getFollowersCount(authToken, userToFollow);
    const { count: followeesCount } = await this.getFolloweesCount(authToken, userToFollow);
    return { followersCount, followeesCount };
  }

  public static async unfollow(
    authToken: AuthToken,
    currentUser: User,
    userToUnfollow: User
  ): Promise<{ followersCount: number; followeesCount: number }> {
    await this.db.followsDAO.unfollow(currentUser.alias, userToUnfollow.alias);
    await this.db.userDAO.decrementFolloweesCount(userToUnfollow.alias);
    const { count: followersCount } = await this.getFollowersCount(authToken, userToUnfollow);
    const { count: followeesCount } = await this.getFolloweesCount(authToken, userToUnfollow);
    return { followersCount, followeesCount };
  }
}
