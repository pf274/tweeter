import { User } from "../../../../utils/shared-models/domain/User";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractFollowsFactory extends AbstractFactory<DatabaseDAO> {
  abstract getFollowers(
    alias: string,
    numFollowers: number,
    firstAlias?: string
  ): Promise<{ usersAliases: string[]; lastAlias: string | undefined }>;

  abstract getFollowees(
    alias: string,
    numFollowees: number,
    firstAlias?: string
  ): Promise<{ usersAliases: string[]; lastAlias: string | undefined }>;

  abstract isFollower(alias: string, followerAlias: string): Promise<boolean>;

  abstract follow(alias: string, followeeAlias: string): Promise<void>;

  abstract unfollow(alias: string, followeeAlias: string): Promise<void>;
}
