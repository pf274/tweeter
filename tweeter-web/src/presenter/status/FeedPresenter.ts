import { AuthToken, Status, User } from "tweeter-shared";
import { FEED_PAGE_SIZE, StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
  public getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[newItems: Status[], hasMore: boolean]> {
    return this.service.loadMoreFeedItems(authToken, user, FEED_PAGE_SIZE, this.lastItem);
  }
  public constructor(view: StatusItemView) {
    super(view, "load more feed items");
  }
}
