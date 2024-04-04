import { DatabaseAuthTokenDAO } from "../DAOs/templates/database/DatabaseAuthTokenDAO";
import { DatabaseFeedDAO } from "../DAOs/templates/database/DatabaseFeedDAO";
import { DatabaseFollowsDAO } from "../DAOs/templates/database/DatabaseFollowsDAO";
import { DatabaseStoryDAO } from "../DAOs/templates/database/DatabaseStoryDAO";
import { DatabaseUserDAO } from "../DAOs/templates/database/DatabaseUserDAO";
import { Factory } from "./Factory";

export abstract class AbstractDatabaseFactory extends Factory {
  protected _authTokenDAO: DatabaseAuthTokenDAO | null = null;
  protected _feedDAO: DatabaseFeedDAO | null = null;
  protected _followsDAO: DatabaseFollowsDAO | null = null;
  protected _storyDAO: DatabaseStoryDAO | null = null;
  protected _userDAO: DatabaseUserDAO | null = null;

  abstract get authTokenDAO(): DatabaseAuthTokenDAO;
  abstract get feedDAO(): DatabaseFeedDAO;
  abstract get followsDAO(): DatabaseFollowsDAO;
  abstract get storyDAO(): DatabaseStoryDAO;
  abstract get userDAO(): DatabaseUserDAO;
}
