import { DynamoDBFunctions } from "../../../AccessFunctions/DynamoDBFunctions";
import { DatabaseFeedDAO } from "../../templates/database/DatabaseFeedDAO";

export class DDBFeedDAO extends DatabaseFeedDAO {
  constructor() {
    super(new DynamoDBFunctions("feed"));
  }
}
