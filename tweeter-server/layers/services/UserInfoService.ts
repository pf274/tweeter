import { AuthToken, User } from "tweeter-shared";
import { FakeData } from "../../utils/FakeData";
import { AuthTokenDTO, UserDTO } from "tweeter-shared";

export class UserInfoService {
  public static async getUserByAlias(
    authToken: AuthTokenDTO,
    alias: string
  ): Promise<{ user: UserDTO | null }> {
    const user = FakeData.instance.findUserByAlias(alias);
    if (user) {
      return { user: user.dto };
    } else {
      return { user: null };
    }
  }

  public static async getFollowersCount(
    authToken: AuthTokenDTO,
    user: UserDTO
  ): Promise<{ count: number }> {
    // TODO: Replace with the result of calling server
    const count = await FakeData.instance.getFollowersCount(User.fromDTO(user));
    return { count };
  }

  public static async getFolloweesCount(
    authToken: AuthTokenDTO,
    user: UserDTO
  ): Promise<{ count: number }> {
    const count = await FakeData.instance.getFolloweesCount(User.fromDTO(user));
    return { count };
  }

  public static async getIsFollowerStatus(
    authToken: AuthTokenDTO,
    user: UserDTO,
    selectedUser: UserDTO
  ): Promise<{ isFollower: boolean }> {
    const isFollower = FakeData.instance.isFollower();
    return { isFollower };
  }

  public static async follow(
    authToken: AuthTokenDTO,
    userToFollow: UserDTO
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
    authToken: AuthTokenDTO,
    userToUnfollow: UserDTO
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
