import { DynamoDBFunctions } from "../../../AccessFunctions/DynamoDBFunctions";
import { DatabaseAuthTokenDAO } from "../../templates/database/DatabaseAuthTokenDAO";

export class DDBAuthTokenDAO extends DatabaseAuthTokenDAO {
  constructor() {
    super(new DynamoDBFunctions("authToken"));
  }
}
