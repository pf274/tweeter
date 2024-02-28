import { AuthToken, Status, User } from "tweeter-shared";
import { FEED_PAGE_SIZE, StatusItemPresenter } from "./StatusItemPresenter";
import { PagedItemView } from "../generics/PagedItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
  public getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[newItems: Status[], hasMore: boolean]> {
    return this.service.loadMoreFeedItems(authToken, user, FEED_PAGE_SIZE, this.lastItem);
  }
  public constructor(view: PagedItemView<Status>) {
    super(view, "load more feed items");
  }
}
