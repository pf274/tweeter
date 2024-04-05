import { AbstractDatabaseFunctions } from "../../../AccessFunctions/AbstractDatabaseFunctions";
import { DatabaseDAO } from "../DatabaseDAO";

export abstract class DatabaseFollowsDAO implements DatabaseDAO {
  public dbFuncs: AbstractDatabaseFunctions;
  constructor(dbFuncs: AbstractDatabaseFunctions) {
    this.dbFuncs = dbFuncs;
  }

  async getFollowers(alias: string, numFollowers: number, firstAlias?: string) {
    const firstItem = firstAlias
      ? { followee_handle: alias, follower_handle: firstAlias }
      : undefined;
    const { items, lastItemReturned } = await this.dbFuncs.getMany(
      numFollowers,
      firstItem,
      "followee_handle",
      alias,
      "follows_index"
    );
    const followerHandles = items.map((item: any) => item.follower_handle);
    return { usersAliases: followerHandles, lastAlias: lastItemReturned };
  }

  async getFollowees(alias: string, numFollowees: number, firstAlias?: string) {
    const firstItem = firstAlias
      ? { follower_handle: alias, followee_handle: firstAlias }
      : undefined;
    const { items, lastItemReturned } = await this.dbFuncs.getMany(
      numFollowees,
      firstItem,
      "follower_handle",
      alias
    );
    const followeeHandles = items.map((item: any) => item.followee_handle);
    return { usersAliases: followeeHandles, lastAlias: lastItemReturned };
  }

  async isFollower(alias: string, followerAlias: string) {
    const result = await this.dbFuncs.get(
      "follower_handle",
      followerAlias,
      "followee_handle",
      alias
    );
    return result !== null;
  }

  async follow(alias: string, followeeAlias: string) {
    await this.dbFuncs.save("follower_handle", alias, {
      followee_handle: followeeAlias,
      timestamp: Date.now().toString(),
    });
  }

  async unfollow(alias: string, followeeAlias: string) {
    await this.dbFuncs.delete("follower_handle", alias, "followee_handle", followeeAlias);
  }
}
