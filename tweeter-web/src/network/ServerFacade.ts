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
  LogoutRequest,
  LogoutResponse,
  PostStatusRequest,
  PostStatusResponse,
  RegisterRequest,
  RegisterResponse,
  UnfollowRequest,
  UnfollowResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private static isLocal = false;
  private static SERVER_URL = this.isLocal
    ? "http://localhost:3001/dev"
    : "https://1oq2sys7fd.execute-api.us-east-1.amazonaws.com/dev";
  private static clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  static async login(request: LoginRequest): Promise<LoginResponse> {
    return this.clientCommunicator.doRequest(request, "/auth/login", "POST");
  }
  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.clientCommunicator.doRequest(request, "/auth/register", "POST");
  }
  static async logout(request: LogoutRequest): Promise<LogoutResponse> {
    return this.clientCommunicator.doRequest(request, "/auth/logout", "POST");
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
  static async unfollow(request: UnfollowRequest): Promise<UnfollowResponse> {
    return this.clientCommunicator.doRequest(request, "/user/unfollow", "POST");
  }
  static async postStatus(
    request: PostStatusRequest
  ): Promise<PostStatusResponse> {
    return this.clientCommunicator.doRequest(request, "/status", "POST");
  }
}
