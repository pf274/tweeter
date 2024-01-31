import { useContext } from "react";
import { UserInfoContext } from "./UserInfoProvider";

const useUserInfoHook = () => useContext(UserInfoContext);

// userInfoContext
export default useUserInfoHook;