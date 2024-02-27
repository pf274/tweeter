import { AuthToken } from "tweeter-shared";
import { AuthenticationService } from "../../model/service/AuthenticationService";
import { MessageView, Presenter } from "../generics/Presenter";

export interface LogoutView extends MessageView {
  navigate: (path: string) => void;
  clearUserInfo: () => void;
}

export class LogoutPresenter extends Presenter {
  private service: AuthenticationService;

  public constructor(view: LogoutView) {
    super(view);
    this.service = new AuthenticationService();
  }

  public async doLogout(authToken: AuthToken): Promise<void> {
    this.view.displayInfoMessage("Logging Out...", 0);
    this.doFailureReportingOperation(async () => {
      await this.service.logout(authToken);
      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
      this.view.navigate("/");
    }, "log user out");
  }

  protected get view(): LogoutView {
    return super.view as LogoutView;
  }
}
