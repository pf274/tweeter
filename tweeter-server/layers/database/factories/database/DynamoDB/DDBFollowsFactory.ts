import { User, UserDTO } from "../../../../../utils/shared-models/domain/User";
import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractFollowsFactory } from "../AbstractFollowsFactory";

export class DDBFollowsFactory extends AbstractFollowsFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("follows");
  }

  async getFollowers(alias: string, numFollowers: number, firstAlias: string) {
    const { items, lastItemReturned } = await this.dao.getMany(
      numFollowers,
      firstAlias,
      "followee_handle",
      alias
    );
    const users = items.map((item: any) => User.fromDTO(item as UserDTO));
    return { users, lastAlias: lastItemReturned };
  }
}
