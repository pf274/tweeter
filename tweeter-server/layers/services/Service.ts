import { DDBAuthTokenFactory } from "../database/factories/database/DynamoDB/DDBAuthTokenFactory";
import { DDBFollowsFactory } from "../database/factories/database/DynamoDB/DDBFollowsFactory";
import { DDBUserFactory } from "../database/factories/database/DynamoDB/DDBUserFactory";
import { S3ImageFactory } from "../database/factories/storage/S3/S3ImageFactory";

export class Service {
  private static _userFactory: DDBUserFactory | null = null;
  private static _authTokenFactory: DDBAuthTokenFactory | null = null;
  private static _imageFactory: S3ImageFactory | null = null;
  private static _followsFactory: DDBFollowsFactory | null = null;

  protected static get userFactory() {
    if (Service._userFactory === null) {
      Service._userFactory = new DDBUserFactory();
    }
    return Service._userFactory;
  }

  protected static get authTokenFactory() {
    if (Service._authTokenFactory === null) {
      Service._authTokenFactory = new DDBAuthTokenFactory();
    }
    return Service._authTokenFactory;
  }

  protected static get imageFactory() {
    if (Service._imageFactory === null) {
      Service._imageFactory = new S3ImageFactory();
    }
    return Service._imageFactory;
  }

  protected static get followsFactory() {
    if (Service._followsFactory === null) {
      Service._followsFactory = new DDBFollowsFactory();
    }
    return Service._followsFactory;
  }
}
