import {
  Box,
  Link as ChakraLink,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import UserContext, { IUserContext } from "../../contexts/UserContext";
import useAuth from "../../hooks/useAuth";
import "./index.scss";

export default function NavBar() {
  const { isAuthenticated } = useAuth();
  const { setEmail, setToken } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();

  function handleLogout() {
    setEmail(null);
    setToken(null);
    navigate(0);
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex ml={10} align={"center"} gap={"16"}>
            <ChakraLink
              as={ReactRouterLink}
              to={"/"}
              fontSize={"sm"}
              fontWeight={400}
            >
              Produtos
            </ChakraLink>
            {!isAuthenticated && (
              <ChakraLink
                as={ReactRouterLink}
                to={"/login"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                py={"1"}
                px={"4"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Acessar
              </ChakraLink>
            )}
            {isAuthenticated && (
              <ChakraLink
                as={ReactRouterLink}
                to={"/login"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                onClick={handleLogout}
                py={"1"}
                px={"16"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sair
              </ChakraLink>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
