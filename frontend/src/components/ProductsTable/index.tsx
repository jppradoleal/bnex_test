import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import productsService from "../../services/products";
import Actions from "../Actions";
import ProductsTableRow from "./ProductsTableRow";
import "./styles.scss";
import useUserContext from "../../hooks/useUserContext";

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
}

export default function ProductsTable({ products }: IProductsTableProps) {
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useUserContext();
  const { email } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleDelete(id: number) {
    setLoading(true);
    await productsService
      .delete(id, token!)
      .then(() => {
        navigate(0);
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Erro ao deletar o produto",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    setLoading(false);
  }

  if (loading) {
    return <Spinner />;
  }

  return products.length > 0 ? (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th isNumeric>Preço</Th>
            <Th>Contato do Dono</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <ProductsTableRow product={product} key={product.id}>
              {product.owner.email === email && (
                <Actions
                  handleDelete={() => handleDelete(product.id)}
                  updateLink={`/update-product/${product.id}`}
                />
              )}
            </ProductsTableRow>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <span>Nenhum produto cadastrado</span>
  );
}
