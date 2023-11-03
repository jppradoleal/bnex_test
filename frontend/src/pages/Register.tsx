import UserForm, { UserData } from "../components/LoginForm";

export default function Register() {
  function handleSubmit(data: UserData) {
    console.log(data)
  }

  return (
    <section id="register-page">
      <UserForm onSubmit={handleSubmit} />
    </section>
  )
}
