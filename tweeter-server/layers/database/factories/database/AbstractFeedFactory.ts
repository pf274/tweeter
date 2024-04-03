import { Status } from "../../../../utils/shared-models/domain/Status";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractFeedFactory extends AbstractFactory<DatabaseDAO> {
  abstract getFeedItems(
    alias: string,
    numFeedItems: number,
    lastFeedItem?: Status
  ): Promise<{ feedItems: Status[]; lastFeedItem: string | undefined }>;

  abstract postStatus(receiver_handles: string[], status: Status): Promise<boolean>;
}
