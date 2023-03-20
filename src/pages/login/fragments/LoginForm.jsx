import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import {
  Button,
  Box,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import loginHandler from "./LoginHandler";
import AlertNotification from "../../../components/alert";

export default function LoginForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = async (values) => {
    setIsLoading(true);
    const res = await loginHandler(values);
    setMessage(res.message);
    setStatus(res.status);

    setTimeout(() => {
      if (res.status === "success") {
        if (res.data.role === "admin") {
          navigate("/dashboard/admin/");
        } else if (res.data.role === "resepsionis") {
          navigate("/dashboard/resepsionis/");
        } else {
          navigate("/dashboard/tamu/");
        }
      }
      setMessage("");
      setStatus("");
      setIsLoading(false);
    }, 1500);
    setIsLoading(false);
  };

  return (
    <Box width={{ lg: "70%" }} mx={"auto"}>
      <AlertNotification status={status} message={message} />
      <Box mt={4}>
        <Heading fontWeight={700} color="orange.500">
          Masuk
        </Heading>
        <Text fontSize="md" my={3}>
          Masuk untuk mulai mencari kamar favorit kalian
        </Text>
      </Box>
      <Box>
        <FormControl method="POST">
          <Input
            type="email"
            name="email"
            id="email"
            borderRadius="full"
            focusBorderColor="orange.500"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <FormHelperText textColor="red" mb={4}>
              Masukkan email
            </FormHelperText>
          )}
          <InputGroup mt={4}>
            <Input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              borderRadius="full"
              focusBorderColor="orange.500"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            <InputRightElement>
              <IconButton
                borderRadius="full"
                size="sm"
                variant="ghost"
                mr={[2, 6, 10]}
                onClick={handleClick}
                aria-label={"whod hide"}
                icon={show ? <EyeOff /> : <Eye />}
              />
            </InputRightElement>
          </InputGroup>
          {errors.password?.type === "required" && (
            <FormHelperText textColor="red">Masukkan password</FormHelperText>
          )}
          {errors.password?.type === "minLength" && (
            <FormHelperText textColor="red">
              Password minimal 8 karakter
            </FormHelperText>
          )}
          <Button
            mt={8}
            bg="orange.500"
            color="white"
            isLoading={isLoading}
            type="submit"
            w="full"
            borderRadius="full"
            borderWidth={2}
            borderColor="orange.500"
            _hover={{ bg: "white", color: "orange.500" }}
            onClick={handleSubmit(async (values) => {
              await submitHandler(values);
            })}
          >
            Masuk
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
