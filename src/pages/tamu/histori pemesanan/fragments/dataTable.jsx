import React from "react";

const columns = [
  {
    title: "No Pemesanan",
    dataIndex: "nomor_pemesanan",
    key: "nomor_pemesanan",
    width: "15%",
  },
  {
    title: "Nama Tamu",
    dataIndex: "nama_tamu",
    key: "nama_tamu",
    width: "15%",
  },
  {
    title: "Email",
    dataIndex: "email_pemesan",
    key: "email_pemesan",
    width: "15%",
  },
  {
    title: "Tanggal Check In",
    dataIndex: "tgl_check_in",
    key: "tgl_check_in",
    width: "15%",
    render: (tgl_check_in) => (
      <span>
        {new Date(tgl_check_in).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Tanggal Check Out",
    dataIndex: "tgl_check_out",
    key: "tgl_check_out",
    width: "15%",
    render: (tgl_check_out) => (
      <span>
        {new Date(tgl_check_out).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Tipe Kamar",
    dataIndex: "tipe_kamar",
    key: "tipe_kamar",
    width: "15%",
    render: (tipe_kamar) => <span>{tipe_kamar?.nama_tipe_kamar}</span>,
  },
  {
    title: "Status",
    dataIndex: "status_pemesanan",
    key: "status_pemesanan",
    width: "15%",
  },
];

export { columns };
