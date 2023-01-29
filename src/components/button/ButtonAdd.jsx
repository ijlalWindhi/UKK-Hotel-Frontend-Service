import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

export default function ButtonAdd({ heading, onclick }) {
  return (
    <Button
      colorScheme={"orange"}
      size={{ base: "sm", md: "md" }}
      px={"10"}
      fontWeight={400}
      fontFamily={"Poppins"}
      onClick={() => onclick()}
      w={{ base: "full", md: "auto" }}
    >
      {heading}
      <Icon ml={2} as={FaPlusCircle} w={5} h={5} />
    </Button>
  );
}
