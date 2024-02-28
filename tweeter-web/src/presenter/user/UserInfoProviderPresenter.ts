import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { UserInfoService } from "../../model/service/UserInfoService";
import { Presenter, View } from "../generics/Presenter";

export interface UserInfoProviderView extends View {}

export class UserInfoProviderPresenter extends Presenter {
  private service: UserInfoService;

  public constructor(view: UserInfoProviderView) {
    super(view);
    this.service = new UserInfoService();
  }

  public retrieveFromLocalStorage(): {
    currentUser: User | null;
    displayedUser: User | null;
    authToken: AuthToken | null;
  } {
    const loggedInUser = this.service.retrieveLoggedInUserFromLocalStorage();
    const retrievedAuthToken = this.service.retrieveAuthTokenFromLocalStorage();

    return {
      currentUser: loggedInUser,
      displayedUser: loggedInUser,
      authToken: retrievedAuthToken,
    };
  }

  public clearLocalStorage(): void {
    this.service.clearLocalStorage();
  }

  public saveToLocalStorage(currentUser: User, authToken: AuthToken): void {
    this.service.saveToLocalStorage(currentUser, authToken);
  }
}
