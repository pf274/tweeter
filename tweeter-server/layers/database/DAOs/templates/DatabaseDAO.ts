import { AbstractDatabaseFunctions } from "../../AccessFunctions/AbstractDatabaseFunctions";
import { DAO } from "./DAO";

export interface DatabaseDAO extends DAO {
  dbFuncs: AbstractDatabaseFunctions;
}
