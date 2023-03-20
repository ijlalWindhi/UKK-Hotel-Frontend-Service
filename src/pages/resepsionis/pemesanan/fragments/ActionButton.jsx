import React from "react";
import { Flex } from "@chakra-ui/react";
import Edit from "./action/Edit";

export default function ActionButton({ payload }) {
  return (
    <Flex dir="row" gap={3}>
      <Edit payload={payload} />
    </Flex>
  );
}
