import React, { useEffect, useState } from "react";
import { Box, Text, Progress, Flex, Image, Button } from "@chakra-ui/react";
import TextPoppins from "../../../components/text/TextPoppins";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { Link } from "react-router-dom";
import {
  getAllTipeKamar,
  tipeKamarSelectors,
} from "../../../utils/store/reducers/tipeKamarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_API_IMAGE } from "../../../utils/constants";

export default function index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id_tipe_kamar } = useParams();
  const tipeKamar = useSelector((state) =>
    tipeKamarSelectors.selectById(state, id_tipe_kamar)
  );

  const getData = async () => {
    setLoading(true);
    await dispatch(getAllTipeKamar());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <Container>
      <Link to="/dashboard/tamu/kamar">
        <Text
          textDecor={"none"}
          _hover={{ color: "black" }}
          my={2}
        >{`<-- Kembali Ke Tipe Kamar`}</Text>
      </Link>
      <Heading text="Detail Tipe Kamar" />
      <Box my={10} maxW={"100%"}>
        {loading ? (
          <Progress size="xs" isIndeterminate colorScheme="green" w={"100%"} />
        ) : (
          <Box>
            <Flex gap={10} flexDir={{ base: "column", md: "row" }}>
              <Image
                src={`${BASE_API_IMAGE}/tipe kamar/${tipeKamar?.foto}`}
                w={{ md: "50%" }}
                h={96}
                objectFit={"cover"}
                border={"1px solid #000"}
                borderRadius={10}
              />
              <Flex flexDir={"column"} gap={3}>
                <Box>
                  <TextPoppins
                    text="Tipe Kamar"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={tipeKamar?.nama_tipe_kamar}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Box>
                  <TextPoppins text="Harga" fontWeight={500} fontSize={"md"} />
                  <TextPoppins
                    text={tipeKamar?.harga}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Box>
                  <TextPoppins
                    text="Deskripsi"
                    fontWeight={500}
                    fontSize={"md"}
                  />
                  <TextPoppins
                    text={tipeKamar?.deskripsi}
                    fontSize={"sm"}
                    fontWeight={300}
                  />
                </Box>
                <Link
                  to={`/dashboard/tamu/pemesanan/${tipeKamar?.id_tipe_kamar}`}
                >
                  <Button colorScheme={"green"} size={"sm"} my={2} w={"full"}>
                    Pesan
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Box>
        )}
      </Box>
    </Container>
  );
}
