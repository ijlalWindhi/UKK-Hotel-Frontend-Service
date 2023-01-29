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
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateKamar,
  kamarSelector,
} from "../../../../utils/store/reducers/kamarSlice";
import { tipeKamarSelectors } from "../../../../utils/store/reducers/tipeKamarSlice";
import AlertNotification from "../../../../components/alert";

export default function ModalAdd({ isOpen, onClose, payload }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const tipeKamar = useSelector(tipeKamarSelectors.selectAll);
  const kamar = useSelector((state) =>
    kamarSelector.selectById(state, payload)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (values) => {
    setIsLoading(!isLoading);
    const valueNonNomor = {
      id_tipe_kamar: values.id_tipe_kamar,
    };
    const valueNomor = {
      nomor_kamar: values.nomor_kamar,
      id_tipe_kamar: values.id_tipe_kamar,
    };

    const res = await dispatch(
      updateKamar({
        values:
          values.nomor_kamar !== kamar?.nomor_kamar
            ? valueNomor
            : valueNonNomor,
        id: payload,
      })
    );
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
    if (kamar) {
      reset(kamar);
    }
  }, [kamar]);

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
          <Heading fontSize={20}>Edit Kamar</Heading>
          <Box mt={4}>
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    type="number"
                    name="nomor_kamar"
                    id="nomor_kamar"
                    borderRadius="full"
                    focusBorderColor="orange.500"
                    placeholder="Nomor Kamar"
                    {...register("nomor_kamar", {
                      required: true,
                    })}
                  />
                  {errors.nomor_kamar?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan nomor kamar
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Select
                    name="id_tipe_kamar"
                    id="id_tipe_kamar"
                    borderRadius="full"
                    focusBorderColor="orange.500"
                    placeholder="Tipe Kamar"
                    {...register("id_tipe_kamar", {
                      required: true,
                    })}
                  >
                    {tipeKamar.map((item) => (
                      <option key={item.id} value={item.id_tipe_kamar}>
                        {item.nama_tipe_kamar}
                      </option>
                    ))}
                  </Select>
                  {errors.id_tipe_kamar?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan tipe kamar
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
              borderRadius="full"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              ml={4}
              px={6}
              colorScheme={"orange"}
              borderRadius="full"
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
