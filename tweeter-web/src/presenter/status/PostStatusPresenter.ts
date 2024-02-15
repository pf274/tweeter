import { AuthToken, Status } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export interface PostStatusView {
  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (message: string, duration: number) => void;
  clearLastInfoMessage: () => void;
}

export class PostStatusPresenter {
  private _view: PostStatusView;
  private service: StatusService;

  constructor(view: PostStatusView) {
    this._view = view;
    this.service = new StatusService();
  }

  public async postStatus(authToken: AuthToken, status: Status): Promise<void> {
    try {
      this._view.displayInfoMessage("Posting status...", 0);

      await this.service.postStatus(authToken, status);

      this._view.clearLastInfoMessage();
      this._view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`
      );
    }
  }
}
