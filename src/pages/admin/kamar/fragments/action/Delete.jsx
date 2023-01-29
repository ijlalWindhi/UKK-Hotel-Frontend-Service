import { useDisclosure, IconButton } from "@chakra-ui/react";
import { Trash2 } from "react-feather";
import ModalDelete from "../ModalDelete";

export default function Delete({ payload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalDelete isOpen={isOpen} onClose={onClose} payload={payload} />
      <IconButton
        onClick={onOpen}
        aria-label="delete"
        icon={<Trash2 />}
        colorScheme="red"
      />
    </>
  );
}
