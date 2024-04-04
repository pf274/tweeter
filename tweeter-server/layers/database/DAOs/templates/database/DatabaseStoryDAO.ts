import { Status } from "../../../../../utils/shared-models/domain/Status";
import { AbstractDatabaseFunctions } from "../../../AccessFunctions/AbstractDatabaseFunctions";
import { DatabaseDAO } from "../DatabaseDAO";

export abstract class DatabaseStoryDAO implements DatabaseDAO {
  public dbFuncs: AbstractDatabaseFunctions;
  constructor(dbFuncs: AbstractDatabaseFunctions) {
    this.dbFuncs = dbFuncs;
  }

  async getStoryItems(
    alias: string,
    numStoryItems: number,
    firstStoryItem?: Status
  ): Promise<{ storyItems: Status[]; lastStoryItem: string | undefined }> {
    const results = await this.dbFuncs.getMany(
      numStoryItems,
      firstStoryItem?.user?.alias,
      "sender_handle",
      alias
    );
    const storyItems = results.items.map((item: any) => Status.fromDTO(item));
    return { storyItems, lastStoryItem: results.lastItemReturned };
  }

  async postStatus(sender_handle: string, status: Status): Promise<boolean> {
    try {
      await this.dbFuncs.save("sender_handle", sender_handle, {
        ...status.dto,
        timestamp: Date.now().toString(),
      });
      return true;
    } catch (err) {
      console.log(`Error posting status: ${(err as Error).message}`);
      throw err;
    }
  }
}
