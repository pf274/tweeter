import { AuthToken, User } from "tweeter-shared";
import { USER_ITEM_PAGE_SIZE, UserItemPresenter, UserItemView } from "./UserItemPresenter";

export class FollowersPresenter extends UserItemPresenter {
  public getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[newItems: User[], hasMore: boolean]> {
    return this.service.loadMoreFollowers(authToken, user, USER_ITEM_PAGE_SIZE, this.lastItem);
  }
  public constructor(view: UserItemView) {
    super(view, "load more followers");
  }
}
