import { Link } from "react-router-dom";
import ProductsTable from "../../components/ProductsTable";
import "./styles.scss";

export default function Home() {
  return (
    <div id="home">
      <ProductsTable />
      <Link to={""} className="create-new-product">
        Criar produto
      </Link>
    </div>
  );
}
