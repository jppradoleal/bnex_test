import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ErrorLabel from "../ErrorLabel";
import "./index.scss";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email({message: "Email inválido"}).min(1),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export type UserData = z.infer<typeof schema>;

interface ILoginFormProps {
  onSubmit: (data: UserData) => void;
}

export default function UserForm({ onSubmit }: ILoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ resolver: zodResolver(schema) });

  return (
    <form action="" id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email")} />
        { errors.email?.message && <ErrorLabel error={errors.email.message} /> }
      </section>

      <section>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} />
        { errors.password?.message && <ErrorLabel error={errors.password.message} /> }
      </section>

      <section>
        <Link to={"/register"}>Registrar</Link>
        <button type="submit">Acessar</button>
      </section>
    </form>
  );
}
