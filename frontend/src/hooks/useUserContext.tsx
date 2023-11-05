import { useContext } from "react";
import UserContext, { IUserContext } from "../contexts/UserContext";

const useUserContext = () => useContext(UserContext) as IUserContext;

export default useUserContext;
