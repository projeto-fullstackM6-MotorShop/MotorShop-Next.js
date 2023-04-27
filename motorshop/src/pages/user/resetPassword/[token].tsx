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
import { useRouter } from "next/router";
import { IUserChangePassword } from "@/interfaces/usersTypes";
import { useAuth } from "@/contexts/authContext";

const changePasswordSchema = yup.object().shape({
  password: yup.string().required(),
});

const ChangePasswordPage = () => {
  const { changePassword } = useAuth();

  const router = useRouter();

  const { token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserChangePassword>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (data: IUserChangePassword) => {
    changePassword(data, token as string);
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
            Alteração de senha
          </Heading>

          <FormLabel fontSize={"xxs"} color={"grey.1"} htmlFor={"password"}>
            Digite sua nova senha
          </FormLabel>
          <Input
            id={"password"}
            type={"password"}
            {...register("password")}
            fontSize={"xs"}
          />
          {errors.password && (
            <Text fontSize={"xxs"} color={"alert.1"}>
              {errors.password?.message}
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

export default ChangePasswordPage;
