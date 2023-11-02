import { Link } from "react-router-dom";

import "./styles.scss";

export default function ProductsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Contato do Dono</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Python Fluente</td>
          <td>R$ 69,99</td>
          <td>joaopedro0128@hotmail.com</td>
          <td className="actions">
            <Link to={""} className="actions_editar">
              Editar
            </Link>
            <Link to={""} className="actions_deletar">
              Deletar
            </Link>
          </td>
        </tr>
        <tr>
          <td>Esteira Kikos</td>
          <td>R$ 1699,99</td>
          <td>jorge@gmail.com</td>
          <td className="actions">
            <Link to={""} className="actions_editar">
              Editar
            </Link>
            <Link to={""} className="actions_deletar">
              Deletar
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
