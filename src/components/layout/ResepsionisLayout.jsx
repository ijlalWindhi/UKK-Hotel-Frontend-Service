import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function ResepsionisLayout() {
  const ciutkan = useSelector((state) => state.global.ciutkan);
  return (
    <Box w={"100vw"} maxW="100%" bgColor={"white"}>
      <Grid
        templateColumns={ciutkan ? { md: "5rem auto" } : { md: "15rem auto" }}
        minH={"100vh"}
        bgColor={"white"}
      >
        <GridItem position={"relative"}>
          <Sidebar />
        </GridItem>
        <GridItem>
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
}
