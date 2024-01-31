import { Context, createContext, useContext } from "react";
import { AuthToken, FakeData, User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "./UserInfoHook";

interface NavigationInfo {
  navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

const extractAlias = (value: string): string => {
  let index = value.indexOf("@");
  return value.substring(index);
};

const getUser = async (
  authToken: AuthToken,
  alias: string
): Promise<User | null> => {
  // TODO: Replace with the result of calling server
  return FakeData.instance.findUserByAlias(alias);
};

export const UserNavigationContext: Context<NavigationInfo> =
  createContext<NavigationInfo>({
    navigateToUser: async (event: React.MouseEvent): Promise<void> => {}
  });

interface Props {
  children: React.ReactNode;
}

function UserNavigationProvider({children}: Props) {
  const { setDisplayedUser, currentUser, authToken } = useUserInfoHook();
  const { displayErrorMessage } = useToastListener();
  async function navigateToUser(event: React.MouseEvent): Promise<void> {
    event.preventDefault();

    try {
      let alias = extractAlias(event.target.toString());

      let user = await getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  }
  return (
    <UserNavigationContext.Provider value={{navigateToUser}}>
      {children}
    </UserNavigationContext.Provider>
  )
}

export default UserNavigationProvider;