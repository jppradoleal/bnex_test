import UserForm, { UserData } from "../components/LoginForm";

export default function Login() {
  function handleSubmit(data: UserData) {
    console.log(data)
  }

  return (
    <section id="login">
      <UserForm onSubmit={handleSubmit} />
    </section>
  )
}
