import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractStoryFactory } from "../AbstractStoryFactory";

export class DDBStoryFactory extends AbstractStoryFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("story");
  }
}
