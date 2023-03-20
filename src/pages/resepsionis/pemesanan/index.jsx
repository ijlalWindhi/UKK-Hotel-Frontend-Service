import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { Input } from "antd";
const { Search } = Input;
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import {
  getAllDataPemesanan,
  searchNamaTamu,
  filterCheckIn,
  pemesananSelector,
} from "../../../utils/store/reducers/pemesananSlice";
import { useSelector, useDispatch } from "react-redux";

export default function index() {
  const dispatch = useDispatch();
  const pemesanan = useSelector(pemesananSelector.selectAll);
  const [loading, setLoading] = useState(false);

  const handleSearch = (name) => {
    setLoading(true);
    dispatch(searchNamaTamu(name));
    setLoading(false);
  };

  const handleFilter = (date) => {
    setLoading(true);
    dispatch(filterCheckIn(date));
    setLoading(false);
  };

  const getData = async () => {
    setLoading(true);
    await dispatch(getAllDataPemesanan());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Container>
      <Heading text="Kelola Pemesanan" />
      <Flex
        alignItems={"end"}
        my={5}
        gap={5}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "full", md: "auto" }}>
          <Text fontSize="xs" fontWeight="500" mb={1}>
            Filter Tanggal Check In
          </Text>
          <Input
            type="date"
            onChange={(e) => {
              if (e.target.value === "") {
                getData();
              } else {
                handleFilter(e.target.value);
              }
            }}
            allowClear
          />
        </Box>
        <Box w={{ base: "full", md: "auto" }}>
          <Search
            placeholder="Cari Nama Tamu"
            onChange={(e) => {
              if (e.target.value === "") {
                getData();
              } else {
                handleSearch(e.target.value);
              }
            }}
            style={{ width: "100%" }}
            allowClear={true}
          />
        </Box>
      </Flex>
      <Box my={10} maxW={"100%"}>
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box w={"100%"}>
            <Table
              columns={columns}
              data={pemesanan}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15", "20"],
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} dari ${total} items`,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
