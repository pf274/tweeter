import { AuthToken, User } from "tweeter-shared";
import {
  FEED_PAGE_SIZE,
  StatusItemPresenter,
  StatusItemView,
} from "./StatusItemPresenter";

export class FeedPresenter extends StatusItemPresenter {
  public constructor(view: StatusItemView) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
    this.itemLoad(
      authToken,
      displayedUser,
      FEED_PAGE_SIZE,
      "load feed items",
      this.service.loadMoreFeedItems
    );
  }
}
