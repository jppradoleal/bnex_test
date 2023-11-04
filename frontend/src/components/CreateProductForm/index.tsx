import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import "./index.scss";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";

const schema = z.object({
  name: z
    .string()
    .max(255, { message: "Nome do produto excede o limite de caracteres" })
    .min(1),
  price: z
    .number({
      errorMap: () => {
        return { message: "Valor inválido" };
      },
    })
    .min(1)
    .nonnegative({ message: "Preço não pode ser menor que zero" }),
});

export type Product = z.infer<typeof schema>;

export interface ICreateProductFormProps {
  onSubmit: (data: Product) => void;
  product?: Product;
}

export default function CreateProductForm({
  onSubmit,
  product,
}: ICreateProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Product>({
    resolver: zodResolver(schema),
    values: product || undefined,
  });

  return (
    <form id="create-product-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors?.name}>
        <FormLabel htmlFor="name">Nome </FormLabel>
        <Input
          type="text"
          placeholder="Nome"
          {...register("name", { required: true })}
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="price">Preço </FormLabel>
        <Input
          type="number"
          step="0.01"
          placeholder="Preço"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        <FormErrorMessage>{errors?.price?.message}</FormErrorMessage>
      </FormControl>
      <Flex direction={"column"}>
        <Button
          isLoading={isSubmitting}
          type="submit"
          mt={4}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          _hover={{
            bg: "pink.300",
          }}
        >
          {product ? "Atualizar" : "Cadastrar"}
        </Button>
      </Flex>
    </form>
  );
}
