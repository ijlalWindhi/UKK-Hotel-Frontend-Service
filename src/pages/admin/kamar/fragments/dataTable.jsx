import React from "react";
import ActionButton from "./ActionButton";

const columns = [
  {
    title: "Nomor Kamar",
    dataIndex: "nomor_kamar",
    key: "nomor_kamar",
    width: "15%",
    sorter: (a, b) => a.nomor_kamar - b.nomor_kamar,
    defaultSortOrder: "ascend",
  },
  {
    title: "Tipe Kamar",
    dataIndex: "tipe_kamar",
    key: "tipe_kamar",
    width: "15%",
    render: (text) => <span>{text?.nama_tipe_kamar}</span>,
  },
  {
    title: "Harga",
    dataIndex: "tipe_kamar",
    key: "harga",
    width: "15%",
    render: (text) => <span>Rp. {text?.harga}</span>,
  },
  {
    title: "Aksi",
    dataIndex: "id_kamar",
    key: "aksi",
    width: "15%",
    render: (record) => <ActionButton payload={record} />,
  },
];

export { columns };
