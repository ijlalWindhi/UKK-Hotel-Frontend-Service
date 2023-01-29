import React from "react";
import { Heading } from "@chakra-ui/react";

export default function HeadingDashboard(props) {
  return (
    <Heading
      as="h1"
      size="xl"
      fontWeight={600}
      color={"orange.500"}
      fontFamily={"Poppins"}
    >
      {props.text}
    </Heading>
  );
}
