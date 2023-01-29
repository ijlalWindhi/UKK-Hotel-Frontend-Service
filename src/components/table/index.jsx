import React from "react";
import { Table } from "antd";

export default function index({ data, columns, pagination }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      scroll={{
        x: 500,
      }}
    />
  );
}
