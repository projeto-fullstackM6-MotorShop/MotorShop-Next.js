import GeneralModal from "./generalModal";
import { useModal } from "@/contexts/modalContext";
import { IUpdateUserData } from "@/interfaces/usersTypes";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { EditIcon, LockIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const updateUserSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  cpf: yup.string().notRequired().min(11).max(11),
  phone: yup.string().notRequired().min(11).max(11),
  birth_date: yup.string().notRequired(),
  password: yup.string().notRequired(),
  description: yup.string().notRequired(),
  is_seller: yup.boolean().notRequired(),
});

const EditUserModal = () => {
  const [updatePass, setUpdatePass] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { user, patchUser, deleteUser } = useAuth();

  const { onClose } = useModal();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUserData>({
    resolver: yupResolver(updateUserSchema),
  });

  const onSubmit = (data: IUpdateUserData) => {
    patchUser(data);

    onClose();
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const onDeleteUser = () => {
    deleteUser();

    router.reload();
  };

  return (
    <GeneralModal>
      <Center width={"100%"} mt={"10"} mb={"10"}>
        <FormControl
          as={"form"}
          display={"flex"}
          flexDirection={"column"}
          gap={"2rem"}
          width={"80%"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading variant={"healding_7_500"}>Editar Perfil</Heading>
            <CloseButton onClick={onClose} />
          </Flex>

          <Text variant={"body_2_500"}>Informações Pessoais</Text>

          <Box>
            <FormLabel
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.1"}
              htmlFor={"name"}
            >
              Nome
            </FormLabel>
            <Input
              id={"name"}
              fontSize={"xs"}
              {...register("name")}
              defaultValue={user?.name}
              placeholder={"Digite seu nome"}
            />
            {errors.name && (
              <Text fontSize={"xxs"} color={"alert.1"}>
                {errors.name?.message}
              </Text>
            )}
          </Box>

          <Box>
            <FormLabel
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.1"}
              htmlFor={"email"}
            >
              Email
            </FormLabel>
            <Input
              id={"email"}
              fontSize={"xs"}
              type={"email"}
              {...register("email")}
              defaultValue={user?.email}
              placeholder={"Digite seu email"}
            />
            {errors.email && (
              <Text fontSize={"xxs"} color={"alert.1"}>
                {errors.email?.message}
              </Text>
            )}
          </Box>

          <Box>
            <FormLabel
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.1"}
              htmlFor={"cpf"}
            >
              CPF
            </FormLabel>
            <Input
              id={"cpf"}
              fontSize={"xs"}
              type={"number"}
              {...register("cpf")}
              defaultValue={user?.cpf}
              placeholder={"Digite seu cpf"}
            />
            {errors.cpf && (
              <Text fontSize={"xxs"} color={"alert.1"}>
                {errors.cpf?.message}
              </Text>
            )}
          </Box>

          <Box>
            <FormLabel
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.1"}
              htmlFor={"phone"}
            >
              Celular
            </FormLabel>
            <Input
              id={"phone"}
              fontSize={"xs"}
              type={"number"}
              {...register("phone")}
              defaultValue={user?.phone}
              placeholder={"Digite seu numero de celular"}
            />
            {errors.phone && (
              <Text fontSize={"xxs"} color={"alert.1"}>
                {errors.phone?.message}
              </Text>
            )}
          </Box>

          <Box>
            <FormLabel
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.1"}
              htmlFor={"birth_date"}
            >
              Data de nascimento
            </FormLabel>
            <Input
              id={"birth_date"}
              fontSize={"xs"}
              {...register("birth_date")}
              defaultValue={user?.birth_date}
              placeholder={"Digite sua data de nascimento"}
            />
            {errors.birth_date && (
              <Text fontSize={"xxs"} color={"alert.1"}>
                {errors.birth_date?.message}
              </Text>
            )}
          </Box>

          {!updatePass && (
            <Button
              variant={"brand1"}
              onClick={() => setUpdatePass(!updatePass)}
              rightIcon={<EditIcon />}
            >
              Editar Senha
            </Button>
          )}
          {updatePass && (
            <>
              <Box>
                <FormLabel
                  fontSize={"xxs"}
                  fontWeight={"medium"}
                  color={"grey.1"}
                  htmlFor={"password"}
                >
                  Senha
                </FormLabel>
                <Input
                  id={"password"}
                  fontSize={"xs"}
                  {...register("password")}
                  placeholder={"Digite sua nova senha"}
                />
                {errors.password && (
                  <Text fontSize={"xxs"} color={"alert.1"}>
                    {errors.password?.message}
                  </Text>
                )}
              </Box>
              <Button
                variant={"brand1"}
                onClick={() => setUpdatePass(!updatePass)}
                rightIcon={<LockIcon />}
              >
                Cancelar Edição de Senha
              </Button>
            </>
          )}
          <Flex gap={"5px"}>
            <Button variant={"negative"} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant={"alert"} onClick={openDeleteModal}>
              Excluir Perfil
            </Button>
            <Button variant={"brand1"} type={"submit"}>
              Salvar Alterações
            </Button>
          </Flex>

          {deleteModal && (
            <GeneralModal>
              <Center width={"100%"} mt={"10"} mb={"10"}>
                <FormControl
                  as={"form"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"2rem"}
                  width={"80%"}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading variant={"healding_7_500"}>Excluir Perfil</Heading>
                    <CloseButton onClick={() => setDeleteModal(!deleteModal)} />
                  </Flex>

                  <Heading variant={"healding_7_600"} textAlign={"center"}>
                    Tem certeza que você quer excluir sua conta?
                  </Heading>

                  <Flex justifyContent={"space-around"}>
                    <Button variant={"sucess"} onClick={onDeleteUser}>
                      Sim
                    </Button>
                    <Button
                      variant={"alert"}
                      onClick={() => setDeleteModal(!deleteModal)}
                    >
                      Não
                    </Button>
                  </Flex>
                </FormControl>
              </Center>
            </GeneralModal>
          )}
        </FormControl>
      </Center>
    </GeneralModal>
  );
};

export default EditUserModal;
