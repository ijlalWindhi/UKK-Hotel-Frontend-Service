import React from "react";
import { Heading as HeadingText } from "@chakra-ui/react";

export default function Heading(props) {
  return (
    <HeadingText
      as="h1"
      size="lg"
      fontWeight={600}
      color={"orange.500"}
      fontFamily={"Poppins"}
    >
      {props.text}
    </HeadingText>
  );
}
