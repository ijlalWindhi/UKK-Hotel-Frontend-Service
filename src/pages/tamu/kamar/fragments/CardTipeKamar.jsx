import React from "react";
import { Text, Card, Image, Box } from "@chakra-ui/react";
import { BASE_API_IMAGE } from "../../../../utils/constants";
import { Link } from "react-router-dom";

export default function CardTipeKamar({ foto, nama, harga, id }) {
  return (
    <Link to={`/dashboard/tamu/detail-kamar/${id}`}>
      <Card
        w={{ base: "80%", md: "sm" }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        m={5}
        _hover={{ transform: "scale(1.02)" }}
        transition="all 0.2s"
        cursor={"pointer"}
      >
        <Image
          src={`${BASE_API_IMAGE}/tipe kamar/${foto}`}
          alt={nama}
          width={"full"}
          height={56}
          objectFit={"cover"}
          objectPosition={"center"}
        />
        <Box p={5}>
          <Text fontWeight={600} fontSize={"lg"} textTransform={"capitalize"}>
            {nama}
          </Text>
          <Text fontWeight={500} fontSize="md">
            Rp. {harga}
          </Text>
        </Box>
      </Card>
    </Link>
  );
}
