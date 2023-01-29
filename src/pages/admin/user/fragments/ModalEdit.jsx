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
  penggunaSelectors,
  updatePengguna,
} from "../../../../utils/store/reducers/penggunaSlice";
import AlertNotification from "../../../../components/alert";

export default function ModalAdd({ isOpen, onClose, payload }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const pengguna = useSelector((state) =>
    penggunaSelectors.selectById(state, payload)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (values) => {
    setIsLoading(true);
    let form = new FormData();
    pengguna.nama_user !== values?.nama_user &&
      form.append("nama_user", values?.nama_user);
    pengguna.role !== values?.role && form.append("role", values?.role);
    pengguna.password !== values?.password &&
      form.append("password", values?.password);
    pengguna.foto !== values?.foto[0] && form.append("foto", values?.foto[0]);
    pengguna.email !== values?.email && form.append("email", values?.email);

    const res = await dispatch(updatePengguna({ values: form, id: payload }));
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
    if (pengguna) {
      reset({
        nama_user: pengguna.nama_user,
        email: pengguna.email,
        role: pengguna.role,
      });
    }
  }, [pengguna]);

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
                    {...register("nama_user")}
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
                    {...register("role")}
                  >
                    <option value="admin">Admin</option>
                    <option value="resepsionis">Resepsionis</option>
                    <option value="tamu">Tamu</option>
                  </Select>
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"email"}
                    name="email"
                    id="email"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Email"
                    {...register("email")}
                  />
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"password"}
                    name="password"
                    id="password"
                    borderRadius="lg"
                    focusBorderColor="orange.500"
                    placeholder="Password"
                    {...register("password")}
                  />
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
