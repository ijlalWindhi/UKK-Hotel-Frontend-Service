import React from "react";
import ActionButton from "./ActionButton";
import { Image } from "@chakra-ui/react";
import { BASE_API_IMAGE } from "../../../../utils/constants";

const columns = [
  {
    title: "Nama",
    dataIndex: "nama_user",
    key: "nama_user",
    width: "15%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "15%",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: "15%",
  },
  {
    title: "Profil",
    dataIndex: "foto",
    key: "foto",
    width: "15%",
    render: (foto) => (
      <Image
        src={`${BASE_API_IMAGE}/user/${foto}`}
        alt="foto profile"
        h={24}
        w={24}
        objectFit={"cover"}
        objectPosition={"center"}
      />
    ),
  },
  {
    title: "Aksi",
    dataIndex: "id_user",
    key: "aksi",
    width: "15%",
    render: (record) => <ActionButton payload={record} />,
  },
];

export { columns };
