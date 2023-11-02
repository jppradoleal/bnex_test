import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProduct from "./pages/CreateProduct";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<CreateProduct />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}
