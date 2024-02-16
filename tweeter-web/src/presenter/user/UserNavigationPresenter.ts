import { AuthToken, User } from "tweeter-shared";
import { UserInfoService } from "../../model/service/UserInfoService";

export interface UserNavigationView {
  displayErrorMessage: (message: string) => void;
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter {
  private _view: UserNavigationView;
  private service: UserInfoService;

  public constructor(view: UserNavigationView) {
    this._view = view;
    this.service = new UserInfoService();
  }

  public async setDisplayedUser(
    authToken: AuthToken,
    alias: string,
    currentUser: User
  ): Promise<void> {
    try {
      const user = await this.service.getUserByAlias(authToken, alias!);
      console.log(user);

      if (Boolean(user)) {
        if (currentUser!.equals(user!)) {
          this._view.setDisplayedUser(currentUser);
        } else {
          this._view.setDisplayedUser(user!);
        }
      }
      return;
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`
      );
    }
  }
}
