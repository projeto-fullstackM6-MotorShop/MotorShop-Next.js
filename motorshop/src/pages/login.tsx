import { useAuth } from "@/contexts/authContext";
import { IUserLogin } from "@/interfaces/usersTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";

const formschema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("e-mail is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(formschema),
  });

  useEffect(() => {
    errors.email ? setEmailError(true) : setEmailError(false);
    errors.password ? setPasswordError(true) : setPasswordError(false);
  }, [errors.email, errors.password]);

  const onSubmitFormLogin = (FormData: IUserLogin) => {
    login(FormData);
  };

  return (
    <>
      <Header />

      <Center minH={"calc(100vh - 220px)"} m={"2rem 0"}>
        <FormControl
          as={"form"}
          maxW={"400px"}
          display={"flex"}
          flexDirection={"column"}
          padding={"20px"}
          gap={"20px"}
          onSubmit={handleSubmit(onSubmitFormLogin)}
        >
          <Heading variant={"healding_5_500"} color={"grey.0"}>
            Login
          </Heading>

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            E-mail
          </FormLabel>
          <Input
            id={"email"}
            type={"email"}
            {...register("email")}
            fontSize={"xs"}
            isInvalid={emailError}
          />
          {errors.email && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.email?.message}
            </Text>
          )}

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Password
          </FormLabel>
          <InputGroup w={"350px"}>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              fontSize={"xs"}
              isInvalid={passwordError}
            />
            <InputRightElement>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.email?.message}
            </Text>
          )}

          <Flex w={"100%"} justifyContent={"flex-end"}>
            <Link fontSize={"xxs"} color={"grey.2"} fontWeight={"normal"}>
              Esqueci minha senha
            </Link>
          </Flex>

          <Button variant={"brand1"} w={"100%"} type={"submit"}>
            Entrar
          </Button>

          <Text variant={"body-2-400"} textAlign={"center"}>
            Ainda não possui cadastro ?
          </Text>

          <Button onClick={() => router.push("/register")}>Cadastrar</Button>
        </FormControl>
      </Center>

      <Footer />
    </>
  );
};

export default LoginPage;
