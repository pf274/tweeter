import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { UserInfoService } from "../../model/service/UserInfoService";

export interface UserInfoProviderView {
  setUserInfo: (value: any) => void;
}

export class UserInfoProviderPresenter {
  private _view: UserInfoProviderView;
  private service: UserInfoService;

  constructor(view: UserInfoProviderView) {
    this._view = view;
    this.service = new UserInfoService();
  }

  updateUserInfo(
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) {
    this._view.setUserInfo({
      ...userInfo,
      currentUser,
      displayedUser,
      authToken,
    });

    if (remember) {
      this.service.saveToLocalStorage(currentUser, authToken);
    }
  }
}
