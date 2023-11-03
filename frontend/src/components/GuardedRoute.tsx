import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function GuardedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <Outlet />;
}
