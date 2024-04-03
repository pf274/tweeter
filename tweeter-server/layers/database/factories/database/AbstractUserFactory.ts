import { User } from "../../../../utils/shared-models/domain/User";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractUserFactory extends AbstractFactory<DatabaseDAO> {
  abstract saveUser(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageURL: string
  ): Promise<User>;

  abstract checkCredentials(alias: string, password: string): Promise<User | null>;
}
