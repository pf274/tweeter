import { DynamoDBFunctions } from "../../../AccessFunctions/DynamoDBFunctions";
import { DatabaseStoryDAO } from "../../templates/database/DatabaseStoryDAO";

export class DDBStoryDAO extends DatabaseStoryDAO {
  constructor() {
    super(new DynamoDBFunctions("story"));
  }
}
