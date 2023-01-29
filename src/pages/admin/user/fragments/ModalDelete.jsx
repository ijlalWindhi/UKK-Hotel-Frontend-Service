import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Center,
  Image,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deletePengguna } from "../../../../utils/store/reducers/penggunaSlice";
import ImageDelete from "../.../../../../../assets/image-delete.svg";

export default function ModalDelete({ isOpen, onClose, payload }) {
  const dispatch = useDispatch();
  return (
    <Modal
      size={{ base: "xs", md: "sm" }}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="3xl" py={8}>
        <ModalBody alignItems="center" textAlign="center">
          <Center>
            <Image
              src={ImageDelete}
              alt={"image delete"}
              w={["80%", "70%", "60%"]}
            />
          </Center>
          <Text fontFamily={"Poppins"} as="h3" fontSize={"lg"} fontWeight={600}>
            Hapus Pengguna Ini?
          </Text>
          <Text fontFamily={"Poppins"} as="h6" fontSize={"xs"} fontWeight={400}>
            Apakah anda yakin ingin menghapus pengguna ini?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant={"outline"}
            colorScheme={"orange"}
            size={"md"}
            mr={3}
            onClick={onClose}
            borderRadius="lg"
            fontWeight={500}
          >
            Batal
          </Button>
          <Button
            size={"md"}
            borderRadius="lg"
            colorScheme={"orange"}
            fontWeight={500}
            onClick={() => {
              dispatch(deletePengguna(payload));
              onClose();
            }}
          >
            Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
