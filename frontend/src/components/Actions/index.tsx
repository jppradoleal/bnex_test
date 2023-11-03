import { Link } from "react-router-dom";

export interface IActionsProps {
  updateLink: string,
  handleDelete: () => void
}

export default function Actions({ updateLink, handleDelete }: IActionsProps) {
  return (
    <td className="actions">
      <Link to={updateLink} className="actions_editar">
        Editar
      </Link>
      <button
        onClick={handleDelete}
        className="actions_deletar"
      >
        Deletar
      </button>
    </td>
  );
}
