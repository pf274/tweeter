import { DDBFactory } from "../database/factories/database/DDBFactory";
import { S3Factory } from "../database/factories/storage/S3Factory";

export class Service {
  private static _databaseFactory: DDBFactory | null = null;
  private static _storageFactory: S3Factory | null = null;

  static get db(): DDBFactory {
    if (!this._databaseFactory) {
      this._databaseFactory = new DDBFactory();
    }
    return this._databaseFactory;
  }

  static get storage(): S3Factory {
    if (!this._storageFactory) {
      this._storageFactory = new S3Factory();
    }
    return this._storageFactory;
  }
}
