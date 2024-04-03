import { S3DAO } from "../../../DAOs/storage/S3DAO";
import { AbstractImageFactory } from "../AbstractImageFactory";

export class S3ImageFactory extends AbstractImageFactory {
  createDAO(): S3DAO {
    return new S3DAO("tweeter-content");
  }
  async uploadImage(imageData: Buffer, imageName: string): Promise<string> {
    return this.dao.save(imageData, "image/png", `image/${imageName}`);
  }
}
