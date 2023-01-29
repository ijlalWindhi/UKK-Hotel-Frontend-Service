import { Button, Icon, Text, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavAccordionItem({
  label,
  path,
  icon,
  isOpen,
  onClose,
  onOpen,
}) {
  const location = useLocation();
  const active = path == location.pathname;
  const ciutkan = useSelector((state) => state.global.ciutkan);

  return (
    <NavLink to={path}>
      <Tooltip
        hasArrow
        label={label}
        bg="primary.100"
        placement="right"
        display={ciutkan ? "block" : "none"}
      >
        <Button
          transition="200ms"
          my={[1, 2, 3]}
          pl={ciutkan ? 0 : { md: 10 }}
          pr={0}
          fontWeight={500}
          justifyContent={ciutkan ? "center" : "flex-start"}
          alignItems="center"
          w={ciutkan ? "70px" : "full"}
          _hover={{ color: "primary.100" }}
          bg={active ? "gray.100" : "white"}
          color={active ? "primary.100" : "gray.500"}
          borderRadius="0"
          position={"relative"}
          onClick={isOpen ? onClose : onOpen}
        >
          <Icon as={icon} w={{ base: 4, lg: 3.5 }} h={{ base: 4, lg: 3.5 }} />
          {!ciutkan && (
            <>
              <Text fontSize={"sm"} fontWeight={"normal"} maxW={"100%"} ml={4}>
                {label}
              </Text>
              <Box
                display={active ? "block" : "none"}
                h={"full"}
                w={2}
                borderRadius={"10px 0 0 10px"}
                bgColor={"primary.100"}
                position={"absolute"}
                right={0}
              />
            </>
          )}
        </Button>
      </Tooltip>
    </NavLink>
  );
}
