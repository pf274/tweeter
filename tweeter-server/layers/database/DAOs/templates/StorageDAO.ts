import { AbstractStorageFunctions } from "../../AccessFunctions/AbstractStorageFunctions";
import { DAO } from "./DAO";

export interface StorageDAO extends DAO {
  storageFuncs: AbstractStorageFunctions;
}
