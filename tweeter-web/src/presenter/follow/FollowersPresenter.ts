import { AuthToken, User } from "tweeter-shared";
import {
  USER_ITEM_PAGE_SIZE,
  UserItemPresenter,
  UserItemView,
} from "./UserItemPresenter";

export class FollowersPresenter extends UserItemPresenter {
  private lastItem: User | null = null;

  public constructor(view: UserItemView) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
    try {
      if (this.hasMoreItems) {
        let [newItems, hasMore] = await this.service.loadMoreFollowers(
          authToken,
          displayedUser,
          USER_ITEM_PAGE_SIZE,
          this.lastItem
        );

        this.hasMoreItems = hasMore;
        this.lastItem = newItems[newItems.length - 1];
        this.view.addItems(newItems);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load follower items because of exception: ${error}`
      );
    }
  }
}
