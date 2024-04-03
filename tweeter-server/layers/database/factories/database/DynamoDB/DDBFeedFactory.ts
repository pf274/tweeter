import { Status } from "../../../../../utils/shared-models/domain/Status";
import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractFeedFactory } from "../AbstractFeedFactory";

export class DDBFeedFactory extends AbstractFeedFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("feed");
  }

  async getFeedItems(
    alias: string,
    numFeedItems: number,
    lastFeedItem?: Status
  ): Promise<{ feedItems: Status[]; lastFeedItem: string | undefined }> {
    const results = await this.dao.getMany(
      numFeedItems,
      lastFeedItem?.user?.alias,
      "receiver_handle",
      alias
    );
    const feedItems = results.items.map((item: any) => Status.fromDTO(item));
    return { feedItems, lastFeedItem: results.lastItemReturned };
  }

  async postStatus(receiver_handles: string[], status: Status): Promise<boolean> {
    try {
      await Promise.all(
        receiver_handles.map((receiver_handle) => {
          return this.dao.save("receiver_handle", receiver_handle, {
            ...status.dto,
            timestamp: Date.now().toString(),
          });
        })
      );
      return true;
    } catch (err) {
      console.log(`Error posting status: ${(err as Error).message}`);
      throw err;
    }
  }
}
