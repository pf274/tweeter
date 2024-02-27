import { AuthToken, User } from "tweeter-shared";
import { UserInfoService } from "../../model/service/UserInfoService";
import { Presenter, View } from "../generics/Presenter";

export interface UserNavigationView extends View {
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter {
  private service: UserInfoService;

  public constructor(view: UserNavigationView) {
    super(view);
    this.service = new UserInfoService();
  }

  public async setDisplayedUser(
    authToken: AuthToken,
    alias: string,
    currentUser: User
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      const user = await this.service.getUserByAlias(authToken, alias!);
      console.log(user);

      if (Boolean(user)) {
        if (currentUser!.equals(user!)) {
          this.view.setDisplayedUser(currentUser);
        } else {
          this.view.setDisplayedUser(user!);
        }
      }
      return;
    }, "get user");
  }

  protected get view(): UserNavigationView {
    return super.view as UserNavigationView;
  }
}
