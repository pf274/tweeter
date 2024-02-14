import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export interface StatusItemView {
  addItems: (newItems: Status[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class StatusItemPresenter {
  private _view: StatusItemView;
  protected service: StatusService;
  private _hasMoreItems: boolean = true;

  protected constructor(view: StatusItemView) {
    this._view = view;
    this.service = new StatusService();
  }

  protected get view(): StatusItemView {
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
