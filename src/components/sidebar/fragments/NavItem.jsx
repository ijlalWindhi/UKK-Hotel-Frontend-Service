import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon, Button, Text, Box, Tooltip } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function NavItem({
  label,
  link,
  icon,
  isOpen,
  onClose,
  onOpen,
}) {
  const location = useLocation();
  const active = location.pathname == link;
  const ciutkan = useSelector((state) => state.global.ciutkan);
  return (
    <NavLink to={link} cursor="pointer">
      <Tooltip
        hasArrow
        label={label}
        bg="orange.500"
        placement="right"
        display={ciutkan ? "block" : "none"}
      >
        <Button
          transition="200ms"
          my={[1, 2, 3]}
          px={ciutkan ? 0 : [2, 3, 6]}
          fontWeight={500}
          justifyContent={ciutkan ? "center" : "flex-start"}
          alignItems="center"
          w={"full"}
          _hover={{ color: "orange.500", borderColor: "transparent" }}
          bg={ciutkan ? "white" : active ? "gray.100" : "white"}
          color={active ? "orange.500" : "gray.500"}
          borderRadius="0"
          position={"relative"}
          onClick={isOpen ? onClose : onOpen}
        >
          <Icon
            as={icon}
            w={{ base: 4, md: 3.5 }}
            h={{ base: 4, md: 3.5 }}
            my={ciutkan && "auto"}
          />
          {!ciutkan && (
            <>
              <Text fontSize={"sm"} fontWeight={"normal"} ml={4}>
                {label}
              </Text>
              <Box
                display={active ? "block" : "none"}
                h={"full"}
                w={2}
                borderRadius={"10px 0 0 10px"}
                bgColor={"orange.500"}
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
