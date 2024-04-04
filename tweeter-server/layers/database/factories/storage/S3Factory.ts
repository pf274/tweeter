import { S3ImageDAO } from "../../DAOs/storage/s3/S3ImageDAO";
import { StorageImageDAO } from "../../DAOs/templates/storage/StorageImageDAO";
import { AbstractStorageFactory } from "../AbstractStorageFactory";

export class S3Factory extends AbstractStorageFactory {
  get imageDAO(): StorageImageDAO {
    return this.getDAO("_imageDAO", S3ImageDAO);
  }
}
