import { User, UserDTO } from "../../../../../utils/shared-models/domain/User";
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
      alias
    );
    const users = items.map((item: any) => User.fromDTO(item as UserDTO));
    return { users, lastAlias: lastItemReturned };
  }

  async getFollowees(alias: string, numFollowees: number, firstAlias?: string) {
    const { items, lastItemReturned } = await this.dao.getMany(
      numFollowees,
      firstAlias,
      "follower_handle",
      alias
    );
    const users = items.map((item: any) => User.fromDTO(item as UserDTO));
    return { users, lastAlias: lastItemReturned };
  }

  async isFollower(alias: string, followerAlias: string) {
    const result = await this.dao.get("follower_handle", followerAlias, "followee_handle", alias);
    return result !== null;
  }
}
