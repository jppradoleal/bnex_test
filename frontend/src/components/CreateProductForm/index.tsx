import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ErrorLabel from "../ErrorLabel";
import "./index.scss";

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
}

export default function CreateProductForm({
  onSubmit,
}: ICreateProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({ resolver: zodResolver(schema) });

  return (
    <form id="create-product-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label htmlFor="name">Nome </label>
        <input {...register("name", { required: true })} />
        {errors.name?.message && <ErrorLabel error={errors.name.message} />}
      </section>
      <section>
        <label htmlFor="price">Preço </label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {errors.price?.message && <ErrorLabel error={errors.price.message} />}
      </section>
      <button type="submit">Cadastrar</button>
    </form>
  );
}
