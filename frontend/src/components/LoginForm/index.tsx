import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import * as z from "zod";
import "./index.scss";

const schema = z.object({
  email: z.string().email({ message: "Email inválido" }).min(1),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export type UserData = z.infer<typeof schema>;

interface ILoginFormProps {
  onSubmit: (data: UserData) => void;
  isRegister?: boolean;
}

export default function UserForm({ onSubmit, isRegister }: ILoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({ resolver: zodResolver(schema) });

  return (
    <form action="" id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors?.email}>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input placeholder="email" type="email" {...register("email")} />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Password:</FormLabel>
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Flex direction={"column"} justifyContent={"stretch"}>
        <Button
          mt={8}
          type="submit"
          isLoading={isSubmitting}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          _hover={{
            bg: "pink.300",
          }}
        >
          {isRegister ? "Registrar" : "Acessar"}
        </Button>
        {!isRegister && (
          <ChakraLink
            as={ReactRouterLink}
            to={"/register"}
            py={"1"}
            px={"4"}
            w={"full"}
            textAlign={"center"}
            mt={2}
            fontSize={"sm"}
          >
            Registrar
          </ChakraLink>
        )}
      </Flex>
    </form>
  );
}
