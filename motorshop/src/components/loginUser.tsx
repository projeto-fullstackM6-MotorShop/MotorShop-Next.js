import { useAuth } from "@/contexts/authContext";
import { IUserLogin } from "@/interfaces/usersTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "./header";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Text,
  
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const LoginPage = () => {
  const { login } = useAuth();

  const formschama = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("e-mail is required"),
    password: yup.string().required("Password is required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [inputemail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const isErrorEmail = inputemail === "";
  const isErrorPassword = inputPassword === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(formschama),
  });

  const onSubmitFormLogin = (FormData: IUserLogin) => {
    login(FormData);
  };

  return (
    <>
      <Flex>
        <Flex>
        <Text fontSize='4xl' color={'black'} fontWeight={'bold'}>
            Motor
          </Text>
          <Text fontSize='3xl' color={'purple'} fontWeight={'bold'}>
            shop
          </Text>
        </Flex>
        <Spacer/>
        <Flex>
          <Link>Fazer Login</Link> 
          <Button>Cadastrar</Button>
        </Flex>
      </Flex>
      <Box>
        <Text fontSize="3xl">Login</Text>
        <FormControl isRequired isInvalid={isErrorEmail}>
          <FormLabel>E-mail</FormLabel>
          <Input
            required
            id="usuario"
            {...register("usuario")}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          {!isErrorEmail ? (
            <FormHelperText>Insert email</FormHelperText>
          ) : (
            <FormErrorMessage>{errors.usuario?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="password" isRequired isInvalid={isErrorPassword}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              required
              type={showPassword ? "text" : "password"}
              {...register("password")}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isErrorPassword ? (
            <FormHelperText>digite sua senha</FormHelperText>
          ) : (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button variant={"default"} onClick={handleSubmit(onSubmitFormLogin)}>
          Sign In
        </Button>
      </Box>
    </>
  );
};
