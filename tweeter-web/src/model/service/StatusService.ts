import { AuthToken, FakeData, Status, User } from "tweeter-shared";

export class StatusService {
  async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }
  async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }

  async postStatus(authToken: AuthToken, status: Status): Promise<void> {
    // TODO: Call the server to post the status
    await new Promise((f) => setTimeout(f, 2000));
  }
}
