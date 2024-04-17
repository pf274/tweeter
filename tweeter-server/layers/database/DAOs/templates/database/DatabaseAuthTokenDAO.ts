import { AuthToken, AuthTokenDTO } from "../../../../../utils/shared-models/domain/AuthToken";
import { AbstractDatabaseFunctions } from "../../../AccessFunctions/AbstractDatabaseFunctions";
import { DatabaseDAO } from "../DatabaseDAO";

export abstract class DatabaseAuthTokenDAO implements DatabaseDAO {
  public dbFuncs: AbstractDatabaseFunctions;
  constructor(dbFuncs: AbstractDatabaseFunctions) {
    this.dbFuncs = dbFuncs;
  }

  async createAuthToken(): Promise<AuthToken> {
    const authToken = AuthToken.Generate();
    await this.dbFuncs.save("authToken", authToken.token, authToken.dto);
    this.pruneExpiredAuthTokens();
    return authToken;
  }

  async validateAuthToken(authToken: AuthToken): Promise<boolean> {
    try {
      const entry = await this.dbFuncs.get("authToken", authToken.token);
      if (entry) {
        const authTokenDTO: AuthTokenDTO = entry as AuthTokenDTO;
        return (
          authTokenDTO.timestamp + 1000 * 60 * 60 * 24 > Date.now() &&
          authTokenDTO.timestamp == authToken.timestamp
        );
      }
      return false;
    } catch (err) {
      console.log(`Error validating auth token: ${err}`);
      return false;
    }
  }

  async pruneExpiredAuthTokens(): Promise<void> {
    try {
      const allAuthTokens: object[] = [];
      let lastItem = undefined;
      do {
        const {
          items,
          lastItemReturned,
        }: { items: object[]; lastItemReturned: object | undefined } = await this.dbFuncs.getMany(
          100,
          lastItem
        );
        allAuthTokens.push(...items);
        lastItem = lastItemReturned;
      } while (lastItem);
      const expiredTokens: any = allAuthTokens.filter((entry) => {
        const authTokenDTO: AuthTokenDTO = entry as AuthTokenDTO;
        if (authTokenDTO.timestamp + 1000 * 60 * 60 * 24 < Date.now()) {
          return true;
        }
      });
      if (expiredTokens.length == 0) {
        return;
      }
      await this.dbFuncs.deleteMany(
        expiredTokens.map((token: any) => ({
          attributeName: "authToken",
          attributeValue: token.token,
        }))
      );
    } catch (err) {
      console.log(`Error pruning expired auth tokens: ${err}`);
    }
  }

  async deleteAuthToken(authToken: AuthToken): Promise<void> {
    await this.dbFuncs.delete("authToken", authToken.token);
    this.pruneExpiredAuthTokens();
  }
}
