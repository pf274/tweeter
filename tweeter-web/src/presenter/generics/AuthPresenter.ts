import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { AuthenticationService } from "../../model/service/AuthenticationService";

export interface AuthView extends View {
  navigate: (path: string) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
}

export abstract class AuthPresenter extends Presenter {
  protected service: AuthenticationService;
  protected constructor(view: AuthView) {
    super(view);
    this.service = new AuthenticationService();
  }

  public abstract checkStatus(...args: any[]): boolean;

  public async handleUserAuthentication(
    serviceMethod: () => Promise<[User, AuthToken]>,
    rememberMe: boolean,
    intent: string = "authenticate user",
    originalUrl: string | undefined = undefined
  ): Promise<void> {
    this.doFailureReportingOperation(async () => {
      let [newUser, newAuthToken] = await serviceMethod();
      this.view.updateUserInfo(newUser, newUser, newAuthToken, rememberMe);

      if (originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate("/");
      }
    }, intent);
  }

  protected get view(): AuthView {
    return super.view as AuthView;
  }
}
