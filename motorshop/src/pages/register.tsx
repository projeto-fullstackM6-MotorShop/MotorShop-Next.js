import Footer from "@/components/footer";
import Header from "@/components/header";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { IRegisterUserData } from "@/interfaces/usersTypes";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";

const addressSchema = yup.object().shape({
  zip_code: yup.string().required().min(8).max(8),
  state: yup.string().required().min(2).max(2),
  city: yup.string().required(),
  street: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string().notRequired(),
});

const registerUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required().min(11).max(11),
  phone: yup.string().required().min(11).max(11),
  birth_date: yup.string().required(),
  password: yup.string().required(),
  description: yup.string().notRequired(),
  is_seller: yup.boolean().notRequired(),
  address: addressSchema,
});

const RegisterPage = () => {
  const [confirmPass, setConfirmPass] = useState("");
  const [unmatchPass, setUnmatchPass] = useState(false);

  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUserData>({
    resolver: yupResolver(registerUserSchema),
  });

  const OnSubmit = (data: IRegisterUserData) => {
    if (data.password != confirmPass) {
      setUnmatchPass(true);
    } else {
      setUnmatchPass(false);
      registerUser(data);
    }
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
          onSubmit={handleSubmit(OnSubmit)}
        >
          <Heading variant={"healding_5_500"} color={"grey.0"}>
            Cadastro
          </Heading>

          <Text variant={"body-2-500"}>Informações Pessoais</Text>

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Nome
          </FormLabel>
          <Input
            fontSize={"xs"}
            placeholder={"Ex: Meu Nome Completo"}
            // isInvalid={emailError}
            {...register("name")}
          />
          {errors.name && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.name?.message}
            </Text>
          )}

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Email
          </FormLabel>
          <Input
            fontSize={"xs"}
            type={"email"}
            placeholder={"Ex: meuemail@mail.com"}
            // isInvalid={emailError}
            {...register("email")}
          />
          {errors.email && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.email?.message}
            </Text>
          )}

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            CPF
          </FormLabel>
          <Input
            fontSize={"xs"}
            type={"number"}
            placeholder={"Ex: 00000000000"}
            // isInvalid={emailError}
            {...register("cpf")}
          />
          {errors.cpf && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.cpf?.message}
            </Text>
          )}

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Celular
          </FormLabel>
          <Input
            fontSize={"xs"}
            type={"number"}
            placeholder={"Ex: 00000000000"}
            // isInvalid={emailError}
            {...register("phone")}
          />
          {errors.phone && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.phone?.message}
            </Text>
          )}

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Data de nascimento
          </FormLabel>
          <Input
            fontSize={"xs"}
            type={"date"}
            // isInvalid={emailError}
            {...register("birth_date")}
          />
          {errors.birth_date && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.birth_date?.message}
            </Text>
          )}

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Descrição
          </FormLabel>
          <Textarea
            fontSize={"xs"}
            resize={"none"}
            placeholder={"Olá, me chamo Meu Nome, e estou aqui para..."}
            // isInvalid={emailError}
            {...register("description")}
          />
          {errors.description && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.description?.message}
            </Text>
          )}

          <Text variant={"body-2-500"}>Informações de endereço</Text>

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            CEP
          </FormLabel>
          <Input
            fontSize={"xs"}
            type={"number"}
            placeholder={"Ex: 00000000"}
            // isInvalid={emailError}
            {...register("address.zip_code")}
          />
          {errors.address?.zip_code && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.address?.zip_code?.message}
            </Text>
          )}

          <Flex gap={"5px"}>
            <Box>
              <FormLabel fontSize={"xxs"} color={"grey.1"}>
                Estado
              </FormLabel>
              <Input
                fontSize={"xs"}
                placeholder={"Ex: XX"}
                // isInvalid={emailError}
                {...register("address.state")}
              />
              {errors.address?.state && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.address?.state?.message}
                </Text>
              )}
            </Box>
            <Box>
              <FormLabel fontSize={"xxs"} color={"grey.1"}>
                Cidade
              </FormLabel>
              <Input
                fontSize={"xs"}
                placeholder={"Ex: Nome da cidade"}
                // isInvalid={emailError}
                {...register("address.city")}
              />
              {errors.address?.city && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.address?.city?.message}
                </Text>
              )}
            </Box>
          </Flex>

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Rua
          </FormLabel>
          <Input
            fontSize={"xs"}
            placeholder={"Ex: Av. Minha Rua"}
            // isInvalid={emailError}
            {...register("address.street")}
          />
          {errors.address?.street && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.address?.street?.message}
            </Text>
          )}

          <Flex gap={"5px"}>
            <Box>
              <FormLabel fontSize={"xxs"} color={"grey.1"}>
                Número
              </FormLabel>
              <Input
                fontSize={"xs"}
                type={"number"}
                placeholder={"Ex: 000"}
                // isInvalid={emailError}
                {...register("address.number")}
              />
              {errors.address?.number && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.address?.number?.message}
                </Text>
              )}
            </Box>
            <Box>
              <FormLabel fontSize={"xxs"} color={"grey.1"}>
                Complemento
              </FormLabel>
              <Input
                fontSize={"xs"}
                placeholder={"Ex: Fica perto do ..."}
                // isInvalid={emailError}
                {...register("address.complement")}
              />
              {errors.address?.complement && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.address?.complement?.message}
                </Text>
              )}
            </Box>
          </Flex>

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Tipo de conta
          </FormLabel>
          <Flex gap={"5px"}>
            <Button w={"calc(100%/2)"} variant={"brand1"}>
              Comprador
            </Button>
            <Button w={"calc(100%/2)"} variant={"negative"}>
              Anuciante
            </Button>
          </Flex>

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Senha
          </FormLabel>
          <Input
            fontSize={"xs"}
            type={"password"}
            placeholder={"Digite sua senha"}
            // isInvalid={emailError}
            {...register("password")}
          />
          {errors.password && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.password?.message}
            </Text>
          )}

          <FormLabel fontSize={"xxs"} color={"grey.1"}>
            Confirmar senha
          </FormLabel>
          <Input
            fontSize={"xs"}
            type={"password"}
            placeholder={"Confirme sua senha"}
            onChange={(e) => setConfirmPass(e.target.value)}
            // isInvalid={emailError}
          />
          {unmatchPass && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              Senha incompátivel.
            </Text>
          )}

          <Button variant={"brand1"} w={"100%"} type={"submit"}>
            Finalizar Cadastro
          </Button>
        </FormControl>
      </Center>

      <Footer />
    </>
  );
};

export default RegisterPage;
