import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { UserInfoService } from "../../model/service/UserInfoService";

export interface UserInfoProviderView {}

export class UserInfoProviderPresenter {
  private _view: UserInfoProviderView;
  private service: UserInfoService;

  public constructor(view: UserInfoProviderView) {
    this._view = view;
    this.service = new UserInfoService();
  }

  public retrieveFromLocalStorage(): {
    currentUser: User | null;
    displayedUser: User | null;
    authToken: AuthToken | null;
  } {
    const loggedInUser = this.service.retrieveLoggedInUserFromLocalStorage();
    let authToken = this.service.retrieveAuthTokenFromLocalStorage();

    if (!!loggedInUser && !!authToken) {
      return {
        currentUser: loggedInUser,
        displayedUser: loggedInUser,
        authToken,
      };
    } else {
      return { currentUser: null, displayedUser: null, authToken: null };
    }
  }

  public clearLocalStorage(): void {
    this.service.clearLocalStorage();
  }

  public saveToLocalStorage(currentUser: User, authToken: AuthToken): void {
    this.service.saveToLocalStorage(currentUser, authToken);
  }
}
