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

  async validateAuthToken(authToken: AuthToken): Promise<boolean> {
    try {
      const entry = await this.dao.get("authToken", authToken.token);
      if (entry) {
        const authTokenDTO: AuthTokenDTO = entry as AuthTokenDTO;
        return authTokenDTO.timestamp + 1000 * 60 * 60 * 24 > Date.now();
      }
      return false;
    } catch (err) {
      console.log(`Error validating auth token: ${err}`);
      return false;
    }
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

  async deleteAuthToken(authToken: AuthToken): Promise<void> {
    await this.dao.delete("authToken", authToken.token);
  }
}
