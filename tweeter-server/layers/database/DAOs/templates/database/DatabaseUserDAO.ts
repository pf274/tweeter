import { User, UserDTO } from "../../../../../utils/shared-models/domain/User";
import { AbstractDatabaseFunctions } from "../../../AccessFunctions/AbstractDatabaseFunctions";
import { DatabaseDAO } from "../DatabaseDAO";
import bcrypt from "bcrypt";

export abstract class DatabaseUserDAO implements DatabaseDAO {
  public dbFuncs: AbstractDatabaseFunctions;
  constructor(dbFuncs: AbstractDatabaseFunctions) {
    this.dbFuncs = dbFuncs;
  }

  async saveUser(
    alias: string,
    password: string,
    firstName: string,
    lastName: string,
    imageURL: string,
    numFollowers?: number,
    numFollowees?: number
  ): Promise<User> {
    const user: User = User.fromDTO({
      alias,
      firstName,
      lastName,
      imageURL,
      encryptedPassword: await bcrypt.hash(password, 10),
    });
    await this.dbFuncs.save("handle", alias, {
      ...user.dto,
      numFollowers: numFollowers || 0,
      numFollowees: numFollowees || 0,
    });
    return user;
  }

  async checkCredentials(alias: string, password: string): Promise<User | null> {
    const data = await this.dbFuncs.get("handle", alias);
    if (data === null) {
      return null;
    }
    const user: User = User.fromDTO(data as UserDTO);
    if (!(await bcrypt.compare(password, user.encryptedPassword))) {
      return null;
    }
    return user;
  }

  async getUser(alias: string): Promise<User | null> {
    const data: any = await this.dbFuncs.get("handle", alias);
    if (data) {
      data.encryptedPassword = "Private";
      return User.fromDTO(data as UserDTO);
    } else {
      return null;
    }
  }

  async getUsers(usersAliases: string[]): Promise<User[]> {
    const data = await this.dbFuncs.getManySpecific(
      usersAliases.map((alias) => ({ attributeName: "handle", attributeValue: alias }))
    );
    return data.map((user: any) =>
      User.fromDTO({ ...user, encryptedPassword: "Private" } as UserDTO)
    );
  }

  async getFollowersCount(alias: string): Promise<number> {
    const data = await this.dbFuncs.get("handle", alias);
    return (data as { numFollowers: number }).numFollowers;
  }

  async getFolloweesCount(alias: string): Promise<number> {
    const data = await this.dbFuncs.get("handle", alias);
    return (data as { numFollowees: number }).numFollowees;
  }

  async incrementFollowersCount(alias: string): Promise<void> {
    return this.getFollowersCount(alias).then((numFollowers) => {
      this.dbFuncs.update("handle", alias, { numFollowers: numFollowers + 1 });
    });
  }

  async decrementFollowersCount(alias: string): Promise<void> {
    return this.getFollowersCount(alias).then((numFollowers) => {
      this.dbFuncs.update("handle", alias, { numFollowers: numFollowers - 1 });
    });
  }

  async incrementFolloweesCount(alias: string): Promise<void> {
    return this.getFolloweesCount(alias).then((numFollowees) => {
      this.dbFuncs.update("handle", alias, { numFollowees: numFollowees + 1 });
    });
  }

  async decrementFolloweesCount(alias: string): Promise<void> {
    return this.getFolloweesCount(alias).then((numFollowees) => {
      this.dbFuncs.update("handle", alias, { numFollowees: Math.max(0, numFollowees - 1) });
    });
  }
}
