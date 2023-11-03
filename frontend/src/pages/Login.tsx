import { useContext, useState } from "react";
import UserForm, { UserData } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import UserContext, { IUserContext } from "../contexts/UserContext";
import authService from "../services/auth";
import { Spinner, useToast, Container } from "@chakra-ui/react";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const { setToken, setEmail } = useContext(UserContext) as IUserContext;
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(data: UserData) {
    setLoading(true);

    await authService
      .login(data)
      .then(({ data: responseData }) => {
        const token = `Token ${responseData.token}`;
        setToken(token);
        setEmail(data.email);
        navigate("/");
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Erro ao realizar o Login",
          duration: 5000,
          status: "error",
          isClosable: true,
        })
      });

    setLoading(false);
  }

  return !loading ? (
    <Container id="login">
      <UserForm onSubmit={handleSubmit} />
    </Container>
  ) : (
    <Spinner />
  );
}
