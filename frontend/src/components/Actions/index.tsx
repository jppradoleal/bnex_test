import { Button, Link as ChakraLink, Td } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export interface IActionsProps {
  updateLink: string;
  handleDelete: () => void;
}

export default function Actions({ updateLink, handleDelete }: IActionsProps) {
  return (
    <Td className="actions">
      <ChakraLink
        as={ReactRouterLink}
        to={updateLink}
        className="actions_editar"
        aria-label="Editar"
      >
        <EditIcon />
      </ChakraLink>
      <Button
        onClick={handleDelete}
        className="actions_deletar"
        aria-label="Deletar"
        bg="transparent"
        _hover={{ bg: "transparent" }}
      >
        <DeleteIcon />
      </Button>
    </Td>
  );
}
