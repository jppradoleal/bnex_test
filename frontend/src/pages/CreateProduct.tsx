import CreateProductForm, { Product } from "../components/CreateProductForm";

export default function CreateProduct() {
  function handleSubmit(data: Product) {
    console.log("Sending data to create product!");
    console.log(data);
  }

  return (
    <section>
      <CreateProductForm onSubmit={handleSubmit} />
    </section>
  );
}
