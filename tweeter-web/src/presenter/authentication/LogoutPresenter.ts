import { AuthToken } from "tweeter-shared";
import { AuthenticationService } from "../../model/service/AuthenticationService";

export interface LogoutView {
  displayInfoMessage: (message: string, duration: number) => void;
  displayErrorMessage: (message: string) => void;
  clearLastInfoMessage: () => void;
  navigate: (path: string) => void;
  clearUserInfo: () => void;
}

export class LogoutPresenter {
  private view: LogoutView;
  private service: AuthenticationService;

  public constructor(view: LogoutView) {
    this.view = view;
    this.service = new AuthenticationService();
  }

  public async doLogout(authToken: AuthToken): Promise<void> {
    this.view.displayInfoMessage("Logging Out...", 0);
    try {
      await this.service.logout(authToken);
      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
      this.view.navigate("/");
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`
      );
    }
  }
}
