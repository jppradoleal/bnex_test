import { Link } from "react-router-dom";
import "./index.scss"

export default function NavBar() {
  return (
    <nav>
      <Link to={"/"}>Produtos</Link>
      <Link to={"/login"}>Acessar</Link>
      <Link to={"/register"}>Registrar</Link>
    </nav>
  )
}