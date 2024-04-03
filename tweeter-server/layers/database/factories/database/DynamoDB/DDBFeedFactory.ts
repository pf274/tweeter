import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractFeedFactory } from "../AbstractFeedFactory";

export class DDBFeedFactory extends AbstractFeedFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("feed");
  }
}
