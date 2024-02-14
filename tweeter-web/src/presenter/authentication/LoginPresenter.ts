import { User, AuthToken } from "tweeter-shared";
import { AuthenticationService } from "../../model/service/AuthenticationService";

export interface LoginView {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  navigate: (path: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter {
  private view: LoginView;
  private service: AuthenticationService;

  public constructor(view: LoginView) {
    this.view = view;
    this.service = new AuthenticationService();
  }

  public async doLogin(
    alias: string,
    password: string,
    originalUrl: string | undefined,
    rememberMe: boolean
  ): Promise<void> {
    try {
      let [user, authToken] = await this.service.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (Boolean(originalUrl)) {
        this.view.navigate(originalUrl!);
      } else {
        this.view.navigate("/");
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    }
  }

  public checkStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }
}
