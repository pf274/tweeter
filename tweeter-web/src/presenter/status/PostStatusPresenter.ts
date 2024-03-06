import { AuthToken, Status } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { MessageView, Presenter, View } from "../generics/Presenter";

export interface PostStatusView extends MessageView {
  setPost: (value: string) => void;
}

export class PostStatusPresenter extends Presenter {
  private _service: StatusService | null = null;

  constructor(view: PostStatusView) {
    super(view);
  }

  public get service() {
    if (!this._service) {
      this._service = new StatusService();
    }
    return this._service;
  }

  public async postStatus(authToken: AuthToken, status: Status): Promise<void> {
    this.doFailureReportingOperation(async () => {
      this.view.displayInfoMessage("Posting status...", 0);

      await this.service.postStatus(authToken, status);

      this.view.setPost("");

      this.view.clearLastInfoMessage();
      this.view.displayInfoMessage("Status posted!", 2000);
    }, "post the status");
  }

  protected get view(): PostStatusView {
    return super.view as PostStatusView;
  }
}
