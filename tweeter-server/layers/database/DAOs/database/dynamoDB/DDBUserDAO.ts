import { DynamoDBFunctions } from "../../../AccessFunctions/DynamoDBFunctions";
import { DatabaseUserDAO } from "../../templates/database/DatabaseUserDAO";

export class DDBUserDAO extends DatabaseUserDAO {
  constructor() {
    super(new DynamoDBFunctions("user"));
  }
}
