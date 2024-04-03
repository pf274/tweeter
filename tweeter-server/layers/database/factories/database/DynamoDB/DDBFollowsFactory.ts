import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractFollowsFactory } from "../AbstractFollowsFactory";

export class DDBFollowsFactory extends AbstractFollowsFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("follows");
  }

  async getFollowers(alias: string, numFollowers: number, firstAlias?: string) {
    const { items, lastItemReturned } = await this.dao.getMany(
      numFollowers,
      firstAlias,
      "followee_handle",
      alias,
      "follows_index"
    );
    const followerHandles = items.map((item: any) => item.follower_handle);
    return { usersAliases: followerHandles, lastAlias: lastItemReturned };
  }

  async getFollowees(alias: string, numFollowees: number, firstAlias?: string) {
    const { items, lastItemReturned } = await this.dao.getMany(
      numFollowees,
      firstAlias,
      "follower_handle",
      alias
    );
    const followeeHandles = items.map((item: any) => item.followee_handle);
    return { usersAliases: followeeHandles, lastAlias: lastItemReturned };
  }

  async isFollower(alias: string, followerAlias: string) {
    const result = await this.dao.get("follower_handle", followerAlias, "followee_handle", alias);
    return result !== null;
  }

  async follow(alias: string, followeeAlias: string) {
    await this.dao.save("follower_handle", alias, {
      followee_handle: followeeAlias,
      timestamp: Date.now().toString(),
    });
  }

  async unfollow(alias: string, followeeAlias: string) {
    await this.dao.delete("follower_handle", alias, "followee_handle", followeeAlias);
  }
}
