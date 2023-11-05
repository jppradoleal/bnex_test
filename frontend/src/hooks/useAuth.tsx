import useUserContext from "./useUserContext";

export default function useAuth() {
  const { token, email } = useUserContext();

  return { isAuthenticated: !!token, email };
}
