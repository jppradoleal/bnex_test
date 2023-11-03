import React from "react";
import { Product } from "./index.tsx";

export interface IProductsTableRowProps {
  product: Product;
  children: React.ReactElement
}

export default function ProductsTableRow({ product, children }: IProductsTableRowProps) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.owner.email}</td>
      { children }
    </tr>
  );
}
