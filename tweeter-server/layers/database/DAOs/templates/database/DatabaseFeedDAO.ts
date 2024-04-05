import { Status } from "../../../../../utils/shared-models/domain/Status";
import { AbstractDatabaseFunctions } from "../../../AccessFunctions/AbstractDatabaseFunctions";
import { DatabaseDAO } from "../DatabaseDAO";

export abstract class DatabaseFeedDAO implements DatabaseDAO {
  public dbFuncs: AbstractDatabaseFunctions;
  constructor(dbFuncs: AbstractDatabaseFunctions) {
    this.dbFuncs = dbFuncs;
  }

  async getFeedItems(
    alias: string,
    numFeedItems: number,
    firstFeedItem?: Status
  ): Promise<{ feedItems: Status[]; lastFeedItem: string | undefined }> {
    const results = await this.dbFuncs.getMany(
      numFeedItems,
      firstFeedItem?.user?.alias,
      "receiver_handle",
      alias
    );
    const feedItems = results.items.map((item: any) => Status.fromDTO(item));
    return { feedItems, lastFeedItem: results.lastItemReturned };
  }

  async postStatus(receiver_handles: string[], status: Status): Promise<boolean> {
    if (receiver_handles.length === 0) return true;
    try {
      await this.dbFuncs.saveMany(
        receiver_handles.map((receiver_handle) => ({
          attributeName: "receiver_handle",
          attributeValue: receiver_handle,
          data: {
            ...status.dto,
            timestamp: Date.now().toString(),
          },
        }))
      );
      return true;
    } catch (err) {
      console.log(`Error posting status: ${(err as Error).message}`);
      throw err;
    }
  }
}
