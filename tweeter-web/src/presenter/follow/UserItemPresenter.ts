import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { PagedItemPresenter, PagedItemView } from "../generics/PagedItemPresenter";

export const USER_ITEM_PAGE_SIZE = 10;

export interface UserItemView extends PagedItemView<User> {}

export abstract class UserItemPresenter extends PagedItemPresenter<User, FollowService> {
  protected constructor(view: PagedItemView<User>, intent: string) {
    super(view, intent);
    this.service = new FollowService();
  }

  protected createService(): FollowService {
    return new FollowService();
  }
}
