import { AbstractStorageFunctions } from "../../../AccessFunctions/AbstractStorageFunctions";
import { StorageDAO } from "../StorageDAO";

export abstract class StorageImageDAO implements StorageDAO {
  public storageFuncs: AbstractStorageFunctions;
  constructor(storageFuncs: AbstractStorageFunctions) {
    this.storageFuncs = storageFuncs;
  }

  abstract uploadImage(imageData: Buffer, imageName: string): Promise<string>;
}
