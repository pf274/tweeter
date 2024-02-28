import { AuthToken, Status, User } from "tweeter-shared";
import { FEED_PAGE_SIZE, StatusItemPresenter } from "./StatusItemPresenter";
import { PagedItemView } from "../generics/PagedItemPresenter";

export class StoryPresenter extends StatusItemPresenter {
  public getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[newItems: Status[], hasMore: boolean]> {
    return this.service.loadMoreStoryItems(authToken, user, FEED_PAGE_SIZE, this.lastItem);
  }
  public constructor(view: PagedItemView<Status>) {
    super(view, "load more story items");
  }
}
