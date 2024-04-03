import { User } from "../../../../utils/shared-models/domain/User";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractFollowsFactory extends AbstractFactory<DatabaseDAO> {
  abstract getFollowers(
    alias: string,
    numFollowers: number,
    firstAlias: string
  ): Promise<{ users: User[]; lastAlias: string | undefined }>;
}
