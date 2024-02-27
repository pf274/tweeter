import { User, AuthToken } from "tweeter-shared";
import { AuthenticationService } from "../../model/service/AuthenticationService";
import { Presenter, View } from "../generics/Presenter";

export interface LoginView extends View {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  navigate: (path: string) => void;
}

export class LoginPresenter extends Presenter {
  private service: AuthenticationService;

  public constructor(view: LoginView) {
    super(view);
    this.service = new AuthenticationService();
  }

  public async doLogin(
    alias: string,
    password: string,
    originalUrl: string | undefined,
    rememberMe: boolean
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      // TODO: remove code duplication with RegisterPresenter
      let [user, authToken] = await this.service.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (Boolean(originalUrl)) {
        this.view.navigate(originalUrl!);
      } else {
        this.view.navigate("/");
      }
    }, "log user in");
  }

  protected get view(): LoginView {
    return super.view as LoginView;
  }

  public checkStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }
}
