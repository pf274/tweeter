import { DynamoDBFunctions } from "../../../AccessFunctions/DynamoDBFunctions";
import { DatabaseFollowsDAO } from "../../templates/database/DatabaseFollowsDAO";

export class DDBFollowsDAO extends DatabaseFollowsDAO {
  constructor() {
    super(new DynamoDBFunctions("follows"));
  }
}
