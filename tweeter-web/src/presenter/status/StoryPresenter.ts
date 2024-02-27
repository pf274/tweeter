import { AuthToken, User } from "tweeter-shared";
import {
  FEED_PAGE_SIZE,
  StatusItemPresenter,
  StatusItemView,
} from "./StatusItemPresenter";

export class StoryPresenter extends StatusItemPresenter {
  public constructor(view: StatusItemView) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
    this.itemLoad(
      authToken,
      displayedUser,
      FEED_PAGE_SIZE,
      "load story items",
      this.service.loadMoreStoryItems
    );
  }
}
