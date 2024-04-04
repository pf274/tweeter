import { AbstractStorageFunctions } from "../../../AccessFunctions/AbstractStorageFunctions";
import { S3Functions } from "../../../AccessFunctions/S3Functions";
import { StorageImageDAO } from "../../templates/storage/StorageImageDAO";

export class S3ImageDAO implements StorageImageDAO {
  public storageFuncs: AbstractStorageFunctions;
  constructor() {
    this.storageFuncs = new S3Functions("tweeter-content");
  }

  async uploadImage(imageData: Buffer, imageName: string): Promise<string> {
    return this.storageFuncs.save(imageData, "image/png", `image/${imageName}`);
  }
}
