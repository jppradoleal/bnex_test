import { Container, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserForm, { UserData } from "../components/LoginForm";
import authService from "../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(data: UserData) {
    setLoading(true);

    await authService
      .create(data)
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Erro ao realizar cadastro",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });

    setLoading(false);
  }

  return !loading ? (
    <Container id="login">
      <UserForm
        onSubmit={handleSubmit}
        isRegister={location.pathname === "/register"}
      />
    </Container>
  ) : (
    <Spinner />
  );
}
