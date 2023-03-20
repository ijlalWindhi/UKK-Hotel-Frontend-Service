import React from "react";
import { Text } from "@chakra-ui/react";

export default function TextPoppins({
  text,
  fontWeight,
  fontSize,
  marginBottom,
  marginTop,
  color,
}) {
  return (
    <Text
      fontFamily={"Poppins"}
      fontWeight={fontWeight}
      fontSize={fontSize}
      mb={marginBottom}
      mt={marginTop}
      color={color}
    >
      {text}
    </Text>
  );
}
