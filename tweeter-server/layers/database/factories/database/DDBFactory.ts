import { DDBAuthTokenDAO } from "../../DAOs/database/dynamoDB/DDBAuthTokenDAO";
import { DDBFeedDAO } from "../../DAOs/database/dynamoDB/DDBFeedDAO";
import { DDBFollowsDAO } from "../../DAOs/database/dynamoDB/DDBFollowsDAO";
import { DDBStoryDAO } from "../../DAOs/database/dynamoDB/DDBStoryDAO";
import { DDBUserDAO } from "../../DAOs/database/dynamoDB/DDBUserDAO";
import { DatabaseAuthTokenDAO } from "../../DAOs/templates/database/DatabaseAuthTokenDAO";
import { DatabaseFeedDAO } from "../../DAOs/templates/database/DatabaseFeedDAO";
import { DatabaseFollowsDAO } from "../../DAOs/templates/database/DatabaseFollowsDAO";
import { DatabaseStoryDAO } from "../../DAOs/templates/database/DatabaseStoryDAO";
import { DatabaseUserDAO } from "../../DAOs/templates/database/DatabaseUserDAO";
import { AbstractDatabaseFactory } from "../AbstractDatabaseFactory";

export class DDBFactory extends AbstractDatabaseFactory {
  get authTokenDAO(): DatabaseAuthTokenDAO {
    return this.getDAO("_authTokenDAO", DDBAuthTokenDAO);
  }
  get feedDAO(): DatabaseFeedDAO {
    return this.getDAO("_feedDAO", DDBFeedDAO);
  }
  get followsDAO(): DatabaseFollowsDAO {
    return this.getDAO("_followsDAO", DDBFollowsDAO);
  }
  get storyDAO(): DatabaseStoryDAO {
    return this.getDAO("_storyDAO", DDBStoryDAO);
  }
  get userDAO(): DatabaseUserDAO {
    return this.getDAO("_userDAO", DDBUserDAO);
  }
}
