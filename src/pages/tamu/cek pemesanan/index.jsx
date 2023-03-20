import React, { useState } from "react";
import {
  Box,
  Button,
  Progress,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { Input } from "antd";
import TextPoppins from "../../../components/text/TextPoppins";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import {
  searchByEmailAndNumber,
  pemesananSelector,
} from "../../../utils/store/reducers/pemesananSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const pemesanan = useSelector(pemesananSelector.selectAll);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const submitHandler = async (value) => {
    setShow(true);
    setLoading(true);
    await dispatch(searchByEmailAndNumber(value));
    setLoading(false);
  };

  return (
    <Container>
      <Heading text="Cari Pemesanan" />
      <Box my={10} maxW={"100%"}>
        <Flex gap={5} alignItems={"center"}>
          <Flex flexDir={"column"} gap={1}>
            <TextPoppins
              text="Masukkan Email"
              fontSize={"sm"}
              fontWeight={400}
            />
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
                <Input placeholder="Masukkan Email" {...field} />
              )}
            />
            {errors.email && (
              <TextPoppins
                text="Email tidak boleh kosong"
                fontSize={"xs"}
                fontWeight={400}
                color={"red.500"}
              />
            )}
          </Flex>
          <Flex flexDir={"column"} gap={1}>
            <TextPoppins
              text="Masukkan Nomor Pemesanan"
              fontSize={"sm"}
              fontWeight={400}
            />
            <Controller
              control={control}
              name="nomor_pemesanan"
              rules={{ required: true }}
              render={({ field }) => (
                <Input placeholder="Masukkan Nomor Pemesanan" {...field} />
              )}
            />
            {errors.nomor_pemesanan && (
              <TextPoppins
                text="Email tidak boleh kosong"
                fontSize={"xs"}
                fontWeight={400}
                color={"red.500"}
              />
            )}
          </Flex>
        </Flex>
        <Button
          mt={3}
          colorScheme={"green"}
          size={"sm"}
          onClick={handleSubmit(async (values) => {
            await submitHandler(values);
          })}
        >
          Cek Pemesanan
        </Button>
        {show &&
          (loading ? (
            <Progress
              size="xs"
              isIndeterminate
              colorScheme="green"
              w={"100%"}
            />
          ) : (
            <Box my={6}>
              {pemesanan.length === 0 && (
                <TextPoppins
                  text="Pemesanan tidak ditemukan"
                  fontSize={"md"}
                  fontWeight={500}
                  color={"red.500"}
                />
              )}
              {pemesanan.map((item) => (
                <Box
                  key={item.id}
                  my={5}
                  display={"flex"}
                  flexDir={"column"}
                  gap={2}
                  maxW={"50%"}
                >
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td colSpan={2}>
                          <TextPoppins
                            text={`Hasil Pencarian ${item.nomor_pemesanan}`}
                            fontSize={"md"}
                            fontWeight={600}
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Nama:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>{item.nama_pemesan}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={`Email:`}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>{item.email_pemesan}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Nomor Pemesan:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>{item.nomor_pemesanan}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Tanggal Pemesan:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>
                          {new Date(item.tgl_pemesanan).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Tanggal Check In:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>
                          {new Date(item.tgl_check_in).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Tanggal Check Out:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>
                          {new Date(item.tgl_check_out).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Nama Tamu:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>{item.nama_tamu}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Jumlah Kamar:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>{item.jumlah_kamar}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Tipe Kamar:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>{item.tipe_kamar.nama_tipe_kamar}</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <TextPoppins
                            text={"Status Pemesanan:"}
                            fontSize={"md"}
                            fontWeight={400}
                          />
                        </Td>
                        <Td>{item.status_pemesanan}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <Button
                    mt={3}
                    colorScheme={"blue"}
                    size={"sm"}
                    onClick={() => {
                      navigate(
                        `/dashboard/tamu/cek-pemesanan/cetak-pemesanan/${item.id_pemesanan}`
                      );
                    }}
                  >
                    Cetak
                  </Button>
                </Box>
              ))}
            </Box>
          ))}
      </Box>
    </Container>
  );
}
