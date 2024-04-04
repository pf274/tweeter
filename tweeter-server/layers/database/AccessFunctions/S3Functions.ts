import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { AbstractStorageFunctions } from "./AbstractStorageFunctions";

export class S3Functions extends AbstractStorageFunctions {
  private bucketName: string;
  private _client: S3Client | null = null;

  private get client(): S3Client {
    if (this._client === null) {
      this._client = new S3Client({ region: "us-east-1" });
    }
    return this._client;
  }

  async save(data: Buffer, contentType: string, fileName: string): Promise<string> {
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: data,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(params);
    await this.client.send(command);
    return `https://${this.bucketName}.s3.us-east-1.amazonaws.com/${fileName}`;
  }

  public constructor(bucketName: string) {
    super();
    this.bucketName = bucketName;
  }
}
