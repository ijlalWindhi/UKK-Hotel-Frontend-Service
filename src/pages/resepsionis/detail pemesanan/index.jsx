import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Text,
  GridItem,
  Progress,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Select } from "antd";
const { Option } = Select;
import TextPoppins from "../../../components/text/TextPoppins";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { Link } from "react-router-dom";
import {
  getAllDataPemesanan,
  updatePemesanan,
  pemesananSelector,
} from "../../../utils/store/reducers/pemesananSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_API_IMAGE } from "../../../utils/constants";

export default function index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id_pemesanan } = useParams();
  const pemesanan = useSelector((state) =>
    pemesananSelector.selectById(state, id_pemesanan)
  );

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
      <Link to="/dashboard/resepsionis/pemesanan">
        <Text
          textDecor={"none"}
          _hover={{ color: "black" }}
          my={2}
        >{`<-- Kembali Ke Kelola Pemesanan`}</Text>
      </Link>
      <Heading text="Detail Pemesanan" />
      <Box my={10} maxW={"100%"}>
        {loading ? (
          <Progress size="xs" isIndeterminate colorScheme="green" w={"100%"} />
        ) : (
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={6}
            w={"100%"}
            maxW={"100%"}
          >
            <GridItem colSpan={1}>
              <Box>
                <TextPoppins
                  text="Data Diri Pemesan"
                  fontWeight={700}
                  color={"orange.500"}
                  fontSize={"xl"}
                  marginBottom={3}
                />
                <Flex flexDir={"column"} gap={3}>
                  <Box>
                    <TextPoppins
                      text="Nomor Pemesanan"
                      fontWeight={500}
                      fontSize={"md"}
                    />
                    <TextPoppins
                      text={pemesanan?.nomor_pemesanan}
                      fontSize={"sm"}
                      fontWeight={300}
                    />
                  </Box>
                  <Box>
                    <TextPoppins
                      text="Nama Pemesan"
                      fontWeight={500}
                      fontSize={"md"}
                    />
                    <TextPoppins
                      text={pemesanan?.nama_pemesan}
                      fontSize={"sm"}
                      fontWeight={300}
                    />
                  </Box>
                  <Box>
                    <TextPoppins
                      text="Email Pemesan"
                      fontWeight={500}
                      fontSize={"md"}
                    />
                    <TextPoppins
                      text={pemesanan?.email_pemesan}
                      fontSize={"sm"}
                      fontWeight={300}
                    />
                  </Box>
                  <Box>
                    <TextPoppins
                      text="Nama Tamu"
                      fontWeight={500}
                      fontSize={"md"}
                    />
                    <TextPoppins
                      text={pemesanan?.nama_tamu}
                      fontSize={"sm"}
                      fontWeight={300}
                    />
                  </Box>
                </Flex>
              </Box>
              <Box>
                <TextPoppins
                  text="Status Pemesanan"
                  fontWeight={700}
                  color={"orange.500"}
                  fontSize={"xl"}
                  marginBottom={3}
                  marginTop={10}
                />
                <Box>
                  <TextPoppins
                    text="Ubah Status Pemesanan"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <Select
                    placeholder="Pilih Status Pemesanan"
                    defaultValue={pemesanan?.status_pemesanan}
                    style={{ width: 200 }}
                    onChange={async (value) => {
                      await dispatch(
                        updatePemesanan({
                          id: id_pemesanan,
                          values: { status_pemesanan: value },
                        })
                      );
                    }}
                  >
                    <Option value="baru">Baru</Option>
                    <Option value="check_in">Check In</Option>
                    <Option value="check_out">Check Out</Option>
                  </Select>
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <TextPoppins
                text="Tanggal Pemesan"
                fontWeight={700}
                color={"orange.500"}
                fontSize={"xl"}
                marginBottom={3}
              />
              <Flex flexDir={"column"} gap={3}>
                <Box>
                  <TextPoppins
                    text="Tanggal Pemesanan"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={pemesanan?.tgl_pemesanan}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Box>
                  <TextPoppins
                    text="Tanggal Check In"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={pemesanan?.tgl_check_in}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Box>
                  <TextPoppins
                    text="Tanggal Check Out"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={pemesanan?.tgl_check_out}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <TextPoppins
                text="Detail Kamar"
                fontWeight={700}
                color={"orange.500"}
                fontSize={"xl"}
                marginBottom={3}
              />
              <Flex flexDir={"column"} gap={3}>
                <Box>
                  <TextPoppins
                    text="Nama Tipe Kamar"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={pemesanan?.tipe_kamar?.nama_tipe_kamar}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Box>
                  <TextPoppins
                    text="Harga Kamar"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={`Rp. ${pemesanan?.tipe_kamar?.harga}`}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Box>
                  <TextPoppins
                    text="Deskripsi Kamar"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={pemesanan?.tipe_kamar?.deskripsi}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Box>
                  <TextPoppins
                    text="Foto Kamar"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <Image
                    src={`${BASE_API_IMAGE}/tipe kamar/${pemesanan?.tipe_kamar?.foto}`}
                    w={28}
                    h={40}
                    objectFit={"cover"}
                    objectPosition={"center"}
                  />
                </Box>
                <Box>
                  <TextPoppins
                    text="Jumlah Kamar"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={pemesanan?.jumlah_kamar}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        )}
      </Box>
    </Container>
  );
}
