import { useContext } from "react";
import UserContext, { IUserContext } from "../contexts/UserContext";

export default function useAuth() {
  const { token, email } = useContext(UserContext) as IUserContext;

  return { isAuthenticated: !!token, email};
}
