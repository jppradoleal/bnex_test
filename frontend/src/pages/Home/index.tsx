import { Link } from "react-router-dom";
import ProductsTable from "../../components/ProductsTable";
import "./styles.scss";

export default function Home() {
  function handleDelete (id: number) {
    console.log(`Deleting Product#${id}`)
  }

  return (
    <div id="home">
      <ProductsTable products={[]} handleDelete={handleDelete}/>
      <Link to={"/create-product"} className="create-new-product">
        Criar produto
      </Link>
    </div>
  );
}
