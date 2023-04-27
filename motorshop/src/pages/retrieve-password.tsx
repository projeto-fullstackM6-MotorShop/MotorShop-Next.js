import Footer from "@/components/footer";
import Header from "@/components/header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { IUserRetrievePassword } from "@/interfaces/usersTypes";
import { useAuth } from "@/contexts/authContext";

const retrievePasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const RetrievePassword = () => {
  const { retrievePassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRetrievePassword>({
    resolver: yupResolver(retrievePasswordSchema),
  });

  const onSubmit = (data: IUserRetrievePassword) => {
    retrievePassword(data);
  };

  return (
    <>
      <Header />

      <Center minH={"calc(100vh - 220px)"} p={"3rem 0"} bg={"grey.8"}>
        <FormControl
          as={"form"}
          maxW={"400px"}
          display={"flex"}
          flexDirection={"column"}
          padding={"20px"}
          gap={"20px"}
          onSubmit={handleSubmit(onSubmit)}
          bg={"grey.11"}
        >
          <Heading variant={"healding_5_500"} color={"grey.0"}>
            Recuperação de senha
          </Heading>

          <FormLabel fontSize={"xxs"} color={"grey.1"} htmlFor={"email"}>
            Digite seu email
          </FormLabel>
          <Input
            id={"email"}
            type={"email"}
            {...register("email")}
            fontSize={"xs"}
          />
          {errors.email && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.email?.message}
            </Text>
          )}

          <Button variant={"brand1"} type={"submit"}>
            Enviar
          </Button>
        </FormControl>
      </Center>
      <Footer />
    </>
  );
};

export default RetrievePassword;
