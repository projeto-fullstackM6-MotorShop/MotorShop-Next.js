import GeneralModal from "./generalModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { IAddressUpdate } from "@/interfaces/users";
import { useModal } from "@/contexts/modalContext";
import { useAuth } from "@/contexts/authContext";

const updateAddressSchema = yup.object().shape({
  zip_code: yup.string().notRequired().min(8).max(8),
  state: yup.string().notRequired().min(2).max(2),
  city: yup.string().notRequired(),
  street: yup.string().notRequired(),
  number: yup.string().notRequired(),
  complement: yup.string().notRequired(),
});

const EditAddressModal = () => {
  const { user, patchAddress } = useAuth();

  const { onClose } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddressUpdate>({
    resolver: yupResolver(updateAddressSchema),
  });

  const onSubmit = (data: IAddressUpdate) => {
    patchAddress(data);

    onClose();
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
            <Heading variant={"healding_7_500"}>Editar Endereço</Heading>
            <CloseButton onClick={onClose} />
          </Flex>

          <Text variant={"body_2_500"}>Informações de Endereço</Text>

          <Box>
            <FormLabel
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.1"}
              htmlFor={"zip_code"}
            >
              CEP
            </FormLabel>
            <Input
              id={"zip_code"}
              fontSize={"xs"}
              {...register("zip_code")}
              defaultValue={user?.address.zip_code}
              placeholder={"Digite seu cep"}
            />
            {errors.zip_code && (
              <Text fontSize={"xxs"} color={"alert.1"}>
                {errors.zip_code?.message}
              </Text>
            )}
          </Box>

          <Flex gap={"5px"}>
            <Box>
              <FormLabel
                fontSize={"xxs"}
                fontWeight={"medium"}
                color={"grey.1"}
                htmlFor={"state"}
              >
                Estado
              </FormLabel>
              <Input
                id={"state"}
                fontSize={"xs"}
                {...register("state")}
                defaultValue={user?.address.state}
                placeholder={"Digite seu estado"}
              />
              {errors.state && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.state?.message}
                </Text>
              )}
            </Box>
            <Box>
              <FormLabel
                fontSize={"xxs"}
                fontWeight={"medium"}
                color={"grey.1"}
                htmlFor={"city"}
              >
                Cidade
              </FormLabel>
              <Input
                id={"city"}
                fontSize={"xs"}
                {...register("city")}
                defaultValue={user?.address.city}
                placeholder={"Digite sua cidade"}
              />
              {errors.city && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.city?.message}
                </Text>
              )}
            </Box>
          </Flex>

          <Box>
            <FormLabel
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.1"}
              htmlFor={"street"}
            >
              Rua
            </FormLabel>
            <Input
              id={"street"}
              fontSize={"xs"}
              {...register("street")}
              defaultValue={user?.address.street}
              placeholder={"Digite sua rua"}
            />
            {errors.street && (
              <Text fontSize={"xxs"} color={"alert.1"}>
                {errors.street?.message}
              </Text>
            )}
          </Box>

          <Flex gap={"5px"}>
            <Box>
              <FormLabel
                fontSize={"xxs"}
                fontWeight={"medium"}
                color={"grey.1"}
                htmlFor={"number"}
              >
                Numero
              </FormLabel>
              <Input
                id={"number"}
                fontSize={"xs"}
                {...register("number")}
                defaultValue={user?.address.number}
                placeholder={"Digite o numero"}
              />
              {errors.number && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.number?.message}
                </Text>
              )}
            </Box>
            <Box>
              <FormLabel
                fontSize={"xxs"}
                fontWeight={"medium"}
                color={"grey.1"}
                htmlFor={"complement"}
              >
                Complemento
              </FormLabel>
              <Input
                id={"complement"}
                fontSize={"xs"}
                {...register("complement")}
                defaultValue={user?.address.complement}
                placeholder={"Digite o complemento"}
              />
              {errors.complement && (
                <Text fontSize={"xxs"} color={"alert.1"}>
                  {errors.complement?.message}
                </Text>
              )}
            </Box>
          </Flex>

          <Flex gap={"5px"} justifyContent={"flex-end"}>
            <Button variant={"negative"} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant={"brandDisable"} type={"submit"}>
              Salvar Alterações
            </Button>
          </Flex>
        </FormControl>
      </Center>
    </GeneralModal>
  );
};

export default EditAddressModal;
