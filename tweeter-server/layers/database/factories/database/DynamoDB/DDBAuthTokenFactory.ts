import { AuthToken, AuthTokenDTO } from "../../../../../utils/shared-models/domain/AuthToken";
import { DynamoDBDAO } from "../../../DAOs/database/DynamoDBDAO";
import { AbstractAuthTokenFactory } from "../AbstractAuthTokenFactory";

export class DDBAuthTokenFactory extends AbstractAuthTokenFactory {
  createDAO(): DynamoDBDAO {
    return new DynamoDBDAO("authToken");
  }

  async createAuthToken(): Promise<AuthToken> {
    const authToken = AuthToken.Generate();
    await this.dao.save("authToken", authToken.token, authToken);
    return authToken;
  }

  async pruneExpiredAuthTokens(): Promise<void> {
    const allAuthTokens: object[] = [];
    let lastItem = undefined;
    do {
      const { items, lastItemReturned } = await this.dao.getMany(100, lastItem);
      allAuthTokens.push(...items);
      lastItem = lastItemReturned;
    } while (lastItem);
    const expiredTokens = allAuthTokens.filter((entry) => {
      const authTokenDTO: AuthTokenDTO = entry as AuthTokenDTO;
      if (authTokenDTO.timestamp + 1000 * 60 * 60 * 24 < Date.now()) {
        return true;
      }
    });
    await Promise.all(
      expiredTokens.map((entry) => {
        const authTokenDTO: AuthTokenDTO = entry as AuthTokenDTO;
        return this.dao.delete("authToken", authTokenDTO.token);
      })
    );
  }
}
