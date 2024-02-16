import { Context, createContext, useState } from "react";
import { User, AuthToken } from "tweeter-shared";
import {
  UserInfoProviderPresenter,
  UserInfoProviderView,
} from "../../presenter/user/UserInfoProviderPresenter";

interface UserInfo {
  currentUser: User | null;
  displayedUser: User | null;
  authToken: AuthToken | null;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  clearUserInfo: () => void;
  setDisplayedUser: (user: User) => void;
}

const defaultUserInfo: UserInfo = {
  currentUser: null,
  displayedUser: null,
  authToken: null,
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean = false
  ) => null,
  clearUserInfo: () => null,
  setDisplayedUser: (user) => null,
};

export const UserInfoContext: Context<UserInfo> =
  createContext<UserInfo>(defaultUserInfo);

interface Props {
  children: React.ReactNode;
}

const UserInfoProvider: React.FC<Props> = ({ children }) => {
  const listener: UserInfoProviderView = {};

  const presenter = new UserInfoProviderPresenter(listener);

  const [userInfo, setUserInfo] = useState({
    ...defaultUserInfo,
    ...presenter.retrieveFromLocalStorage(),
  });

  const updateUserInfo = (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => {
    setUserInfo({
      ...userInfo,
      currentUser,
      displayedUser,
      authToken,
    });

    if (remember) {
      presenter.saveToLocalStorage(currentUser, authToken);
    }
  };

  const clearUserInfo = () => {
    setUserInfo({
      ...userInfo,
      currentUser: null,
      displayedUser: null,
      authToken: null,
    });
    presenter.clearLocalStorage();
  };

  const setDisplayedUser = (user: User) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, displayedUser: user }));
  };

  return (
    <UserInfoContext.Provider
      value={{
        ...userInfo,
        updateUserInfo,
        clearUserInfo,
        setDisplayedUser,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
