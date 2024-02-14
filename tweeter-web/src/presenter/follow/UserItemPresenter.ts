import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const USER_ITEM_PAGE_SIZE = 10;

export interface UserItemView {
  addItems: (newItems: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {
  private _view: UserItemView;
  private _hasMoreItems: boolean = true;
  protected service: FollowService;

  protected constructor(view: UserItemView) {
    this._view = view;
    this.service = new FollowService();
  }

  protected get view(): UserItemView {
    return this._view;
  }

  protected set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  public abstract loadMoreItems(
    authToken: AuthToken,
    displayedUser: User
  ): void;
}
