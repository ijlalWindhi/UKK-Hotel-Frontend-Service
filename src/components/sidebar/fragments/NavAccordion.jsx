import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import NavAccordionItem from "./NavAccordionItem";
import { useSelector } from "react-redux";

export default function NavAccordion({
  payload,
  heading,
  icon,
  isOpen,
  onClose,
  onOpen,
}) {
  const ciutkan = useSelector((state) => state.global.ciutkan);
  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem border="0">
          <Tooltip
            hasArrow
            label={heading}
            bg="primary.100"
            placement="right"
            display={ciutkan ? "block" : "none"}
          >
            <AccordionButton
              _hover={{ color: "primary.100" }}
              bgColor={"white"}
              color={"gray.500"}
              my={[1, 2, 3]}
              px={ciutkan ? 0 : [2, 3, 6]}
              justifyContent={ciutkan ? "center" : "space-between"}
              alignItems="center"
              w={"full"}
              borderRadius="0"
            >
              <Box display={"flex"} alignItems={"center"}>
                <Icon
                  as={icon}
                  w={{ base: 4, lg: 3.5 }}
                  h={{ base: 4, lg: 3.5 }}
                />
                {!ciutkan && (
                  <Text fontSize={"sm"} fontWeight={"normal"} ml={4}>
                    {heading}
                  </Text>
                )}
              </Box>
              <Box display={ciutkan ? "none" : "flex"}>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </Tooltip>
          <AccordionPanel
            transitionDuration={0}
            p={0}
            display={"flex"}
            flexDir={"column"}
          >
            {payload.map((item, index) => {
              return (
                <NavAccordionItem
                  key={index}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                />
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
