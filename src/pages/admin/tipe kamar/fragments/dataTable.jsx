import React from "react";
import ActionButton from "./ActionButton";
import { Image } from "@chakra-ui/react";
import { BASE_API_IMAGE } from "../../../../utils/constants";

const columns = [
  {
    title: "Nama Tipe",
    dataIndex: "nama_tipe_kamar",
    key: "nama_tipe_kamar",
    width: "15%",
  },
  {
    title: "Deskripsi",
    dataIndex: "deskripsi",
    key: "deskripsi",
    width: "15%",
  },
  {
    title: "Harga",
    dataIndex: "harga",
    key: "harga",
    width: "15%",
    render: (harga) => <span>Rp. {harga}</span>,
  },
  {
    title: "Foto",
    dataIndex: "foto",
    key: "foto",
    width: "15%",
    render: (foto) => (
      <Image
        src={`${BASE_API_IMAGE}/tipe kamar/${foto}`}
        alt="foto"
        h={52}
        objectFit={"cover"}
        objectPosition={"center"}
      />
    ),
  },
  {
    title: "Aksi",
    dataIndex: "id_tipe_kamar",
    key: "aksi",
    width: "15%",
    render: (record) => <ActionButton payload={record} />,
  },
];

export { columns };
