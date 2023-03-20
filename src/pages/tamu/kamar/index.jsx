import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { Input, DatePicker } from "antd";
const { Search } = Input;
import Heading from "../../../components/text/Heading";
import {
  getAllTipeKamar,
  searchTipeKamar,
  checkAvailableKamarByDate,
  tipeKamarSelectors,
} from "../../../utils/store/reducers/tipeKamarSlice";
import { useSelector, useDispatch } from "react-redux";
import CardTipeKamar from "./fragments/CardTipeKamar";

export default function index() {
  const dispatch = useDispatch();
  const tipeKamar = useSelector(tipeKamarSelectors.selectAll);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    setLoading(true);
    dispatch(searchTipeKamar(value));
    setLoading(false);
  };

  const handleCheckAvailable = (date) => {
    setLoading(true);
    dispatch(
      checkAvailableKamarByDate({ check_in: date[0], check_out: date[1] })
    );
    console.log(date);
    setLoading(false);
  };

  const getData = async () => {
    setLoading(true);
    await dispatch(getAllTipeKamar());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Box m={{ base: 5, md: 10, lg: 20 }}>
      <Heading text="Tipe Kamar" />
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        my={5}
        gap={5}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "full", md: "auto" }}>
          <Text fontWeight={400} fontSize={"sm"} mb={1}>
            Filter Tanggal
          </Text>
          <DatePicker.RangePicker
            style={{
              width: "100%",
            }}
            onChange={(date, dateString) => {
              if (dateString[0] === "" && dateString[1] === "") {
                getData();
              } else {
                handleCheckAvailable(dateString);
              }
            }}
          />
        </Box>
        <Box w={{ base: "full", md: "auto" }}>
          <Search
            placeholder="Cari Tipe Kamar"
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
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              {tipeKamar.map((item, index) => (
                <Box
                  key={index}
                  w={{ base: "full", md: "auto" }}
                  my={5}
                  mx={{ base: 0, md: 5 }}
                >
                  <CardTipeKamar
                    foto={item.foto}
                    nama={item.nama_tipe_kamar}
                    harga={item.harga}
                    id={item.id_tipe_kamar}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}
