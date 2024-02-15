import { AuthToken, User } from "tweeter-shared";

const CURRENT_USER_KEY: string = "CurrentUserKey";
const AUTH_TOKEN_KEY: string = "AuthTokenKey";

export class UserInfoService {
  saveToLocalStorage(currentUser: User, authToken: AuthToken): void {
    localStorage.setItem(CURRENT_USER_KEY, currentUser.toJson());
    localStorage.setItem(AUTH_TOKEN_KEY, authToken.toJson());
  }

  public retrieveLoggedInUserFromLocalStorage(): User | null {
    return User.fromJson(localStorage.getItem(CURRENT_USER_KEY));
  }

  public retrieveAuthTokenFromLocalStorage(): AuthToken | null {
    return AuthToken.fromJson(localStorage.getItem(AUTH_TOKEN_KEY));
  }

  clearLocalStorage(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
