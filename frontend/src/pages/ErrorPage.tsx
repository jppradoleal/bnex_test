import { Container } from "@chakra-ui/react";
import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container id="404-page">
      <h1>Oops!</h1>
      <p>Page not found!</p>
    </Container>
  );
}
