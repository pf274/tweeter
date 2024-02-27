import { AuthToken, User } from "tweeter-shared";
import {
  USER_ITEM_PAGE_SIZE,
  UserItemPresenter,
  UserItemView,
} from "./UserItemPresenter";

export class FollowingPresenter extends UserItemPresenter {
  public constructor(view: UserItemView) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
    this.itemLoad(
      authToken,
      displayedUser,
      USER_ITEM_PAGE_SIZE,
      "load followee items",
      this.service.loadMoreFollowees
    );
  }
}
