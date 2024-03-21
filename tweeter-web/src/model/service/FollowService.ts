import {
  AuthToken,
  GetFolloweesResponse,
  GetFollowersResponse,
  User,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class FollowService {
  public async loadMoreFollowers(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    const response: GetFollowersResponse = await ServerFacade.getFollowers({
      authToken: authToken.dto,
      user: user.dto,
      pageSize: pageSize,
      lastItem: lastItem!.dto,
    });
    return [
      response.users.map((userDTO) => User.fromDTO(userDTO)),
      response.hasMore,
    ];
  }

  public async loadMoreFollowees(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    const response: GetFolloweesResponse = await ServerFacade.getFollowees({
      authToken: authToken.dto,
      user: user.dto,
      pageSize: pageSize,
      lastItem: lastItem!.dto,
    });
    return [
      response.users.map((userDTO) => User.fromDTO(userDTO)),
      response.hasMore,
    ];
  }
}
