import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTipeKamar } from "../../../../utils/store/reducers/tipeKamarSlice";
import AlertNotification from "../../../../components/alert";

export default function ModalAdd({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (values) => {
    setIsLoading(!isLoading);
    let form = new FormData();
    form.append("nama_tipe_kamar", values.nama_tipe_kamar);
    form.append("harga", values.harga);
    form.append("deskripsi", values.deskripsi);
    form.append("foto", values.foto[0]);

    if (
      values.foto[0].type !== "image/jpeg" &&
      values.foto[0].type !== "image/png"
    ) {
      setMessage("File harus berupa gambar");
      setStatus("error");
      setTimeout(() => {
        setIsLoading(false), setMessage(""), setStatus("");
      }, 1000);
      return;
    }

    const res = await dispatch(addTipeKamar(form));
    setMessage(res.payload.message);
    setStatus(res.payload.status);

    if (res.payload.status === "success") {
      setTimeout(() => {
        onClose(), reset(), setStatus(""), setMessage("");
        setIsLoading(false);
      }, 500);
      return;
    } else {
      setTimeout(() => {
        setIsLoading(false), setMessage(""), setStatus("");
      }, 1000);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Tambah Tipe Kamar</Heading>
          <Box mt={4}>
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="nama_tipe_kamar"
                    id="nama_tipe_kamar"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Nama"
                    {...register("nama_tipe_kamar", {
                      required: true,
                    })}
                  />
                  {errors.nama_tipe_kamar?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan nama
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <InputGroup>
                    <Input
                      type={"number"}
                      name="harga"
                      id="harga"
                      borderRadius="lg"
                      focusBorderColor="orange.500"
                      placeholder="Harga"
                      {...register("harga", {
                        required: true,
                      })}
                    />
                    <InputLeftElement pointerEvents="none" children="Rp." />
                  </InputGroup>
                  {errors.harga?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan harga
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"file"}
                    name="foto"
                    id="foto"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Foto"
                    {...register("foto", {
                      required: true,
                    })}
                  />
                  {errors.foto?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan foto
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Textarea
                    name="deskripsi"
                    id="deskripsi"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Deskripsi"
                    minH={10}
                    {...register("deskripsi", {
                      required: true,
                    })}
                  />
                  {errors.deskripsi?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan deskripsi
                    </FormHelperText>
                  )}
                </Flex>
              </Grid>
            </Container>
            <Button
              variant="outline"
              colorScheme={"orange"}
              fontWeight={500}
              px={6}
              borderRadius="lg"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              ml={4}
              px={6}
              colorScheme={"orange"}
              borderRadius="lg"
              fontWeight={500}
              onClick={handleSubmit(async (values) => {
                await submitHandler(values);
              })}
              isLoading={isLoading}
            >
              Tambah
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
