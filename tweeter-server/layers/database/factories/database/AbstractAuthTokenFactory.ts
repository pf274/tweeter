import { AuthToken } from "../../../../utils/shared-models/domain/AuthToken";
import { DatabaseDAO } from "../../DAOs/interfaces/DatabaseDAO";
import AbstractFactory from "../AbstractFactory";

export abstract class AbstractAuthTokenFactory extends AbstractFactory<DatabaseDAO> {
  abstract createAuthToken(): Promise<AuthToken>;
}
