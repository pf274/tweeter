import {
  AuthToken,
  User,
  GetFolloweesCountRequest,
  GetFollowersCountRequest,
  GetIsFollowerRequest,
  FollowRequest,
  UnfollowRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class UserService {
  public async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const request: GetFollowersCountRequest = {
      authToken: authToken.dto,
      user: user.dto,
    };
    const response = await ServerFacade.getFollowersCount(request);
    return response.count;
  }

  public async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    const request: GetFolloweesCountRequest = {
      authToken: authToken.dto,
      user: user.dto,
    };
    const response = await ServerFacade.getFolloweesCount(request);
    return response.count;
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    const request: GetIsFollowerRequest = {
      authToken: authToken.dto,
      user: user.dto,
      selectedUser: selectedUser.dto,
    };
    const response = await ServerFacade.getIsFollowerStatus(request);
    return response.isFollower;
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    const request: FollowRequest = {
      authToken: authToken.dto,
      userToFollow: userToFollow.dto,
    };
    const response = await ServerFacade.follow(request);

    return [response.followersCount, response.followeesCount];
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    const request: UnfollowRequest = {
      authToken: authToken.dto,
      userToUnfollow: userToUnfollow.dto,
    };
    const response = await ServerFacade.unfollow(request);

    return [response.followersCount, response.followeesCount];
  }
}
