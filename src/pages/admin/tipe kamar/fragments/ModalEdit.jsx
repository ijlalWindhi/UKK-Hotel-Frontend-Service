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
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  tipeKamarSelectors,
  updateTipeKamar,
} from "../../../../utils/store/reducers/tipeKamarSlice";
import AlertNotification from "../../../../components/alert";

export default function ModalAdd({ isOpen, onClose, payload }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const tipeKamar = useSelector((state) =>
    tipeKamarSelectors.selectById(state, payload)
  );
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (values) => {
    setIsLoading(!isLoading);
    let form = new FormData();
    tipeKamar.nama_tipe_kamar !== values.nama_tipe_kamar &&
      form.append("nama_tipe_kamar", values.nama_tipe_kamar);
    tipeKamar.harga !== values.harga && form.append("harga", values.harga);
    tipeKamar.deskripsi !== values.deskripsi &&
      form.append("deskripsi", values.deskripsi);
    form.append("foto", values.foto[0]);

    const res = await dispatch(updateTipeKamar({ values: form, id: payload }));
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

  useEffect(() => {
    if (tipeKamar) {
      reset(tipeKamar);
    }
  }, [tipeKamar]);

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
                    {...register("nama_tipe_kamar")}
                  />
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
                      {...register("harga")}
                    />
                    <InputLeftElement pointerEvents="none" children="Rp." />
                  </InputGroup>
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"file"}
                    name="foto"
                    id="foto"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Foto"
                    {...register("foto")}
                  />
                </Flex>
                <Flex direction="column">
                  <Textarea
                    name="deskripsi"
                    id="deskripsi"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Deskripsi"
                    minH={10}
                    {...register("deskripsi")}
                  />
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
              Simpan
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
