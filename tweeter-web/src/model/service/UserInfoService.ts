import { AuthToken, User } from "tweeter-shared";

const CURRENT_USER_KEY: string = "CurrentUserKey";
const AUTH_TOKEN_KEY: string = "AuthTokenKey";

export class UserInfoService {
  saveToLocalStorage(currentUser: User, authToken: AuthToken): void {
    localStorage.setItem(CURRENT_USER_KEY, currentUser.toJson());
    localStorage.setItem(AUTH_TOKEN_KEY, authToken.toJson());
  }

  retrieveFromLocalStorage(
    currentUser: User | null,
    displayedUser: User | null,
    authToken: AuthToken | null
  ) {
    let loggedInUser = User.fromJson(localStorage.getItem(CURRENT_USER_KEY));
    let authToken2 = AuthToken.fromJson(localStorage.getItem(AUTH_TOKEN_KEY));

    if (!!loggedInUser && !!authToken) {
      return {
        currentUser: loggedInUser,
        displayedUser: loggedInUser,
        authToken: authToken2,
      };
    } else {
      return { currentUser: null, displayedUser: null, authToken: null };
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  clearUserInfo() {
    setUserInfo({
      ...userInfo,
      currentUser: null,
      displayedUser: null,
      authToken: null,
    });
    clearLocalStorage();
  }
}
