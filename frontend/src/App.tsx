import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProduct from "./pages/CreateProduct";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import UserContext from "./contexts/UserContext";
import { useEffect, useState } from "react";
import GuardedRoute from "./components/GuardedRoute";

export default function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  function updateToken(token: string | null) {
    setToken(token);
    if (token) {
      localStorage.setItem("bnex:auth_token", token);
    } else {
      localStorage.removeItem("bnex:auth_token");
    }
  }

  function updateEmail(email: string | null) {
    setEmail(email);
    if (email) {
      localStorage.setItem("bnex:auth_email", email);
    } else {
      localStorage.removeItem("bnex:auth_email");
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem("bnex:auth_token"));
    setEmail(localStorage.getItem("bnex:auth_email"));
  }, []);


  function handleLogout() {
    updateEmail(null);
    updateToken(null);
    navigate(0);
  }

  return (
    <UserContext.Provider
      value={{ token, setToken: updateToken, email, setEmail: updateEmail }}
    >
      <Router>
        <NavBar handleLogout={handleLogout}/>
        <main>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<GuardedRoute />}>
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/update-product/:id" element={<CreateProduct />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </UserContext.Provider>
  );
}
