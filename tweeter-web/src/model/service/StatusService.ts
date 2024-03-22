import {
  AuthToken,
  PostStatusRequest,
  GetFeedRequest,
  Status,
  User,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class StatusService {
  async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const request: GetFeedRequest = {
      authToken: authToken.dto,
      user: user.dto,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };
    const response = await ServerFacade.getFeedItems(request);
    const statuses = response.statusItems.map((statusItem) =>
      Status.fromDTO(statusItem)
    );
    return [statuses, response.hasMore];
  }
  async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const request: GetFeedRequest = {
      authToken: authToken.dto,
      user: user.dto,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };
    const response = await ServerFacade.getStoryItems(request);
    const statuses = response.statusItems.map((statusItem) =>
      Status.fromDTO(statusItem)
    );
    return [statuses, response.hasMore];
  }

  async postStatus(authToken: AuthToken, status: Status): Promise<void> {
    const postRequest: PostStatusRequest = {
      authToken: authToken.dto,
      status: status.dto,
    };
    const postResponse = await ServerFacade.postStatus(postRequest);
  }
}
