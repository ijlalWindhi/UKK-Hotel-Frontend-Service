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
  Select,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPengguna } from "../../../../utils/store/reducers/penggunaSlice";
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
    setIsLoading(true);
    let form = new FormData();
    form.append("nama_user", values.nama_user);
    form.append("role", values.role);
    form.append("email", values.email);
    form.append("password", values.password);
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

    const res = await dispatch(addPengguna(form));
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
          <Heading fontSize={20}>Tambah Pengguna</Heading>
          <Box mt={4}>
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="nama_user"
                    id="nama_user"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Nama"
                    {...register("nama_user", {
                      required: true,
                    })}
                  />
                  {errors.nama_user?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan nama
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Select
                    name="role"
                    id="role"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Role"
                    {...register("role", {
                      required: true,
                    })}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="tamu">Tamu</option>
                  </Select>
                  {errors.role?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan role
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"email"}
                    name="email"
                    id="email"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan email
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"password"}
                    name="password"
                    id="password"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan password
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
