import React from "react";
import { Product } from "./index.tsx";
import {Tr, Td} from "@chakra-ui/react"

export interface IProductsTableRowProps {
  product: Product;
  children: React.ReactElement | false
}

export default function ProductsTableRow({ product, children }: IProductsTableRowProps) {
  return (
    <Tr>
      <Td>{product.name}</Td>
      <Td isNumeric>{product.price}</Td>
      <Td>{product.owner.email}</Td>
      { children }
    </Tr>
  );
}
