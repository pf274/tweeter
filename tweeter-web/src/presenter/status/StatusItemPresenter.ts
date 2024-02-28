import { Status } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { PagedItemPresenter, PagedItemView } from "../generics/PagedItemPresenter";

export const FEED_PAGE_SIZE = 10;

export abstract class StatusItemPresenter extends PagedItemPresenter<Status, StatusService> {
  protected constructor(view: PagedItemView<Status>, intent: string) {
    super(view, intent);
    this.service = this.createService();
  }

  protected createService(): StatusService {
    return new StatusService();
  }
}
