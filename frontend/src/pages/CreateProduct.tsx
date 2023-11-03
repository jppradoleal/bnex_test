import CreateProductForm, { Product } from "../components/CreateProductForm";

export default function CreateProduct() {
  const { token } = useContext(UserContext) as IUserContext;
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
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
