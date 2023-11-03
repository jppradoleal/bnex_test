import { Spinner, useToast, Container } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateProductForm, { Product } from "../components/CreateProductForm";
import UserContext, { IUserContext } from "../contexts/UserContext";
import productsService from "../services/products";

export default function CreateProduct() {
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useContext(UserContext) as IUserContext;
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      productsService
        .get(parseInt(id))
        .then(({ data }) => {
          setProduct(data);
        })
        .catch(() => {
          toast({
            title: "Erro",
            description: "Erro ao carregar produto",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [id, toast]);

  async function handleSubmit(data: Product) {
    setLoading(true);

    if (!id) {
      await productsService
        .create(data, token!)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          toast({
            title: "Erro",
            description: "Erro ao criar produto",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      await productsService
        .update(data, parseInt(id), token!)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          toast;
        });
    }

    setLoading(false);
  }

  return !loading ? (
    <Container>
      <CreateProductForm
        onSubmit={handleSubmit}
        product={product || undefined}
      />
    </Container>
  ) : (
    <Spinner />
  );
}
