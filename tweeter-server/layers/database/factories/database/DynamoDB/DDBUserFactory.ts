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
    imageURL: string
  ): Promise<User> {
    const user: User = User.fromDTO({
      alias,
      firstName,
      lastName,
      imageURL,
      encryptedPassword: await bcrypt.hash(password, 10),
    });
    await this.dao.save("alias", alias, user.dto);
    return user;
  }

  async checkCredentials(alias: string, password: string): Promise<User | null> {
    const data = await this.dao.get("alias", alias);
    const user: User = User.fromDTO(data as UserDTO);
    if (user === null) {
      return null;
    }
    if (!(await bcrypt.compare(password, user.encryptedPassword))) {
      return null;
    }
    return user;
  }
}
