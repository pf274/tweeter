import {
  FollowRequest,
  FollowResponse,
  GetFeedRequest,
  GetFeedResponse,
  GetFolloweesRequest,
  GetFolloweesResponse,
  GetFollowersCountRequest,
  GetFollowersCountResponse,
  GetFollowersRequest,
  GetFollowersResponse,
  GetIsFollowerRequest,
  GetIsFollowerResponse,
  GetStoriesRequest,
  GetStoriesResponse,
  GetUserByAliasRequest,
  GetUserByAliasResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private static SERVER_URL = "http://localhost:3001/dev";
  private static clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  static async login(request: LoginRequest): Promise<LoginResponse> {
    return this.clientCommunicator.doRequest(request, "/auth/login", "POST");
  }
  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.clientCommunicator.doRequest(request, "/auth/register", "POST");
  }
  static async getFollowers(
    request: GetFollowersRequest
  ): Promise<GetFollowersResponse> {
    return this.clientCommunicator.doRequest(
      request,
      "/items/followers",
      "GET"
    );
  }
  static async getFollowees(
    request: GetFolloweesRequest
  ): Promise<GetFolloweesResponse> {
    return this.clientCommunicator.doRequest(
      request,
      "/items/followees",
      "GET"
    );
  }
  static async logout(): Promise<void> {
    // Pause so we can see the logging out message.
    // TODO: Figure out what this is supposed to do.
  }
  static async getFeedItems(request: GetFeedRequest): Promise<GetFeedResponse> {
    return this.clientCommunicator.doRequest(request, "/items/feed", "GET");
  }
  static async getStoryItems(
    request: GetStoriesRequest
  ): Promise<GetStoriesResponse> {
    return this.clientCommunicator.doRequest(request, "/items/stories", "GET");
  }
  static async getUserByAlias(
    request: GetUserByAliasRequest
  ): Promise<GetUserByAliasResponse> {
    return this.clientCommunicator.doRequest(request, "/user/get", "GET");
  }
  static async getFollowersCount(
    request: GetFollowersCountRequest
  ): Promise<GetFollowersCountResponse> {
    return this.clientCommunicator.doRequest(
      request,
      "/user/followersCount",
      "GET"
    );
  }
  static async getFolloweesCount(
    request: GetFollowersCountRequest
  ): Promise<GetFollowersCountResponse> {
    return this.clientCommunicator.doRequest(
      request,
      "/user/followeesCount",
      "GET"
    );
  }
  static async getIsFollowerStatus(
    request: GetIsFollowerRequest
  ): Promise<GetIsFollowerResponse> {
    return this.clientCommunicator.doRequest(
      request,
      "/user/isFollower",
      "GET"
    );
  }
  static async follow(request: FollowRequest): Promise<FollowResponse> {
    return this.clientCommunicator.doRequest(request, "/user/follow", "POST");
  }
  static async unfollow(request: FollowRequest): Promise<FollowResponse> {
    return this.clientCommunicator.doRequest(request, "/user/unfollow", "POST");
  }
}
