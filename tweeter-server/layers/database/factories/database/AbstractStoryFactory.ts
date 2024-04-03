import { Status } from "../../../../utils/shared-models/domain/Status";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractStoryFactory extends AbstractFactory<DatabaseDAO> {
  abstract getStoryItems(
    alias: string,
    numStoryItems: number,
    lastStoryItem?: Status
  ): Promise<{ storyItems: Status[]; lastStoryItem: string | undefined }>;

  abstract postStatus(sender_handle: string, status: Status): Promise<boolean>;
}
