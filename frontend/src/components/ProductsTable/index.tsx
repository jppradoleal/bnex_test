import Actions from "../Actions";
import ProductsTableRow from "./ProductsTableRow";
import "./styles.scss";

export type Product = {
  id: number;
  name: string;
  price: number;
  owner: {
    email: string;
  };
};

export interface IProductsTableProps {
  products: Product[];
  handleDelete: (id: number) => void;
}

export default function ProductsTable({
  products,
  handleDelete,
}: IProductsTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Contato do Dono</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductsTableRow product={product}>
            <Actions
              handleDelete={() => handleDelete(product.id)}
              updateLink={`/update-product/${product.id}`}
            />
          </ProductsTableRow>
        ))}
      </tbody>
    </table>
  );
}
