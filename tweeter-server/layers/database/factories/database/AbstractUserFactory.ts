import { User } from "../../../../utils/shared-models/domain/User";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractUserFactory extends AbstractFactory<DatabaseDAO> {
  abstract saveUser(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageURL: string,
    numFollowers?: number,
    numFollowees?: number
  ): Promise<User>;

  abstract checkCredentials(alias: string, password: string): Promise<User | null>;

  abstract getUser(alias: string): Promise<User | null>;

  abstract getFollowersCount(alias: string): Promise<number>;

  abstract getFolloweesCount(alias: string): Promise<number>;

  abstract incrementFollowersCount(alias: string): Promise<void>;

  abstract decrementFollowersCount(alias: string): Promise<void>;

  abstract incrementFolloweesCount(alias: string): Promise<void>;

  abstract decrementFolloweesCount(alias: string): Promise<void>;
}
