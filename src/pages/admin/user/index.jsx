import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, useDisclosure } from "@chakra-ui/react";
import { Input } from "antd";
const { Search } = Input;
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import ButtonAdd from "../../../components/button/ButtonAdd";
import ModalAdd from "./fragments/ModalAdd";
import {
  getAllPengguna,
  searchPengguna,
  penggunaSelectors,
} from "../../../utils/store/reducers/penggunaSlice";
import { useSelector, useDispatch } from "react-redux";

export default function index() {
  const dispatch = useDispatch();
  const pengguna = useSelector(penggunaSelectors.selectAll);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (value) => {
    setLoading(true);
    dispatch(searchPengguna(value));
    setLoading(false);
  };

  const getData = async () => {
    setLoading(true);
    await dispatch(getAllPengguna());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Container>
      <ModalAdd isOpen={isOpen} onClose={onClose} />
      <Heading text="Kelola Pengguna" />
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        my={5}
        gap={5}
        flexDir={{ base: "column", md: "row" }}
      >
        <ButtonAdd heading={"Tambah Pengguna"} onclick={onOpen} />
        <Box w={{ base: "full", md: "auto" }}>
          <Search
            placeholder="Cari Pengguna"
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
              data={pengguna}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 3,
                showSizeChanger: true,
                pageSizeOptions: ["3", "5", "10"],
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
