import { DAO } from "../DAOs/interfaces/DAO";
import { DatabaseDAO } from "../DAOs/interfaces/DatabaseDAO";
import { StorageDAO } from "../DAOs/interfaces/StorageDAO";

export default abstract class AbstractFactory<DAOType extends DatabaseDAO | StorageDAO> {
  private DAOInstance: DAOType | null = null;
  abstract createDAO(): DAOType;

  public get dao(): DAOType {
    if (this.DAOInstance === null) {
      this.DAOInstance = this.createDAO();
    }
    return this.DAOInstance;
  }

  public constructor() {
    this.DAOInstance = this.createDAO();
  }
}
