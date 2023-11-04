import { createContext } from "react";

export interface IUserContext {
  token: string | null;
  setToken: (token: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
}

const UserContext = createContext<IUserContext | null>(null);

export default UserContext;
