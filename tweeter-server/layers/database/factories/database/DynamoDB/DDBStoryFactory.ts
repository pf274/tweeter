import { Status } from "../../../../../utils/shared-models/domain/Status";
import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractStoryFactory } from "../AbstractStoryFactory";

export class DDBStoryFactory extends AbstractStoryFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("story");
  }

  async getStoryItems(
    alias: string,
    numStoryItems: number,
    lastStoryItem?: Status
  ): Promise<{ storyItems: Status[]; lastStoryItem: string | undefined }> {
    const results = await this.dao.getMany(
      numStoryItems,
      lastStoryItem?.user?.alias,
      "sender_handle",
      alias
    );
    const storyItems = results.items.map((item: any) => Status.fromDTO(item));
    return { storyItems, lastStoryItem: results.lastItemReturned };
  }

  async postStatus(sender_handle: string, status: Status): Promise<boolean> {
    try {
      await this.dao.save("sender_handle", sender_handle, {
        ...status.dto,
        timestamp: Date.now(),
      });
      return true;
    } catch (err) {
      console.log(`Error posting status: ${(err as Error).message}`);
      throw err;
    }
  }
}
