import { IconButton } from "@chakra-ui/react";
import { Edit as EditIcon } from "react-feather";
import { Link } from "react-router-dom";

export default function Edit({ payload }) {
  return (
    <Link to={`/dashboard/resepsionis/detail-pemesanan/${payload}`}>
      <IconButton aria-label="edit" icon={<EditIcon />} colorScheme="blue" />
    </Link>
  );
}
