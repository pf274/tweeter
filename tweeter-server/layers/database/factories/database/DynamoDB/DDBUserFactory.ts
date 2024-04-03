import { User, UserDTO } from "../../../../../utils/shared-models/domain/User";
import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractUserFactory } from "../AbstractUserFactory";
import bcrypt from "bcrypt";

export class DDBUserFactory extends AbstractUserFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("user");
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
    await this.dao.save("handle", alias, {
      ...user.dto,
      numFollowers: numFollowers || 0,
      numFollowees: numFollowees || 0,
    });
    return user;
  }

  async checkCredentials(alias: string, password: string): Promise<User | null> {
    const data = await this.dao.get("handle", alias);
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
    const data: any = await this.dao.get("handle", alias);
    data.encryptedPassword = "Private";
    if (data) {
      return User.fromDTO(data as UserDTO);
    } else {
      return null;
    }
  }

  async getFollowersCount(alias: string): Promise<number> {
    const data = await this.dao.get("handle", alias);
    return (data as { numFollowers: number }).numFollowers;
  }

  async getFolloweesCount(alias: string): Promise<number> {
    const data = await this.dao.get("handle", alias);
    return (data as { numFollowees: number }).numFollowees;
  }

  async incrementFollowersCount(alias: string): Promise<void> {
    return this.getFollowersCount(alias).then((numFollowers) => {
      this.dao.update("handle", alias, { numFollowers: numFollowers + 1 });
    });
  }

  async decrementFollowersCount(alias: string): Promise<void> {
    return this.getFollowersCount(alias).then((numFollowers) => {
      this.dao.update("handle", alias, { numFollowers: numFollowers - 1 });
    });
  }

  async incrementFolloweesCount(alias: string): Promise<void> {
    return this.getFolloweesCount(alias).then((numFollowees) => {
      this.dao.update("handle", alias, { numFollowees: numFollowees + 1 });
    });
  }

  async decrementFolloweesCount(alias: string): Promise<void> {
    return this.getFolloweesCount(alias).then((numFollowees) => {
      this.dao.update("handle", alias, { numFollowees: numFollowees - 1 });
    });
  }
}
