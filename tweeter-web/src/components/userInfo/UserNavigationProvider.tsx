import { Context, createContext, useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "./UserInfoHook";
import {
  UserNavigationPresenter,
  UserNavigationView,
} from "../../presenter/user/UserNavigationPresenter";
import { UserService } from "../../model/service/UserService";

interface NavigationInfo {
  navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

const extractAlias = (value: string): string => {
  const index = value.indexOf("@");
  return value.substring(index);
};

export const UserNavigationContext: Context<NavigationInfo> =
  createContext<NavigationInfo>({
    navigateToUser: async (event: React.MouseEvent): Promise<void> => {},
  });

interface Props {
  children: React.ReactNode;
}

function UserNavigationProvider({ children }: Props) {
  const { setDisplayedUser, currentUser, authToken } = useUserInfoHook();
  const { displayErrorMessage } = useToastListener();

  const listener: UserNavigationView = {
    displayErrorMessage,
    setDisplayedUser,
  };

  const [presenter] = useState(new UserNavigationPresenter(listener));
  async function navigateToUser(event: React.MouseEvent): Promise<void> {
    event.preventDefault();
    const alias = extractAlias(event.target.toString());
    presenter.setDisplayedUser(authToken!, alias, currentUser!);
  }

  return (
    <UserNavigationContext.Provider value={{ navigateToUser }}>
      {children}
    </UserNavigationContext.Provider>
  );
}

export default UserNavigationProvider;
