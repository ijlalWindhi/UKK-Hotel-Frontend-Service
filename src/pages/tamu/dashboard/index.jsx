import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import HeadingDashboard from "../../../components/text/HeadingDashboard";
import Container from "../../../components/container/Container";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";

export default function index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getLocalStorage(LOCAL_STORAGE_USER);
    setUser(user);
  }, []);
  return (
    <Container>
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={5}
        w={"full"}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
      >
        <HeadingDashboard text="Selamat Datang di Dashboard Tamu" />
        <Text fontWeight={500} fontSize={"xl"}>
          Saat ini anda login sebagai : {user?.nama_user}
        </Text>
      </Box>
    </Container>
  );
}
