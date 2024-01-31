import { useContext } from "react";
import { UserNavigationContext } from "./UserNavigationProvider";


const useUserNavigation = () => useContext(UserNavigationContext);

export default useUserNavigation;