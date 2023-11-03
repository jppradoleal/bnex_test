import {
  Alert,
  AlertIcon,
  Link as ChakraLink,
  Container,
  Spinner,
} from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import ProductsTable, { Product } from "../../components/ProductsTable";
import useAuth from "../../hooks/useAuth";
import "./styles.scss";

interface IProductsListResponse {
  count: number;
  results: Product[];
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [{ data, error, loading }, refetch] =
    useAxios<IProductsListResponse>("/products");

  useEffect(() => {
    refetch();
  }, [refetch]);

  return !loading ? (
    <Container maxW="container.lg" id="home">
      {data?.results && <ProductsTable products={data.results} />}
      {error && (
        <Alert>
          <AlertIcon /> {error.message}
        </Alert>
      )}
      {isAuthenticated && (
        <ChakraLink
          as={ReactRouterLink}
          to={"/create-product"}
          className="create-new-product"
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          py={"2"}
          px={"16"}
          mt="8"
          _hover={{
            bg: "pink.300",
          }}
        >
          Criar produto
        </ChakraLink>
      )}
    </Container>
  ) : (
    <Spinner />
  );
}
