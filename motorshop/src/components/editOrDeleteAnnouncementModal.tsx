import GeneralModal from "./generalModal";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useEffect, useState } from "react";
import dataCar from "../../dataTeste";
import { useModal } from "@/contexts/modalContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IAnnoucementInterface,
  IAnnouncementUpdate,
} from "@/interfaces/annoucement";
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
  Textarea,
} from "@chakra-ui/react";

const EditOrDeleteAnnouncementModal = () => {
  const {
    editAnnouncement,
    announcementView,
    setdeleteAnnounceModal,
    deleteAnnounceModal,
    deleteAnnounce,
  } = useAnnouncement();

  const { onClose } = useModal();

  const formschema = yup.object().shape({
    brand: yup.string().notRequired(),
    model: yup.string().notRequired(),
    fabrication_year: yup.string().notRequired(),
    km: yup.string().notRequired(),
    color: yup.string().notRequired(),
    fuel_type: yup.string().notRequired(),
    price: yup.number().notRequired(),
    fipe: yup.number().notRequired(),
    description: yup.string().notRequired(),
    cover_img: yup.string().notRequired(),
    image: yup.string().notRequired(),
    image2: yup.string().notRequired(),
    image3: yup.string().notRequired(),
    image4: yup.string().notRequired(),
    image5: yup.string().notRequired(),
    image6: yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnnouncementUpdate>({
    resolver: yupResolver(formschema),
  });

  const closeModal = () => {
    onClose();
  };

  const onDeleteAnnounce = () => {
    deleteAnnounce(announcementView!.id);
    setdeleteAnnounceModal(false);
    onClose();
  };

  const onFormSubmit = (formData: IAnnouncementUpdate) => {
    editAnnouncement(formData, announcementView!.id);
    onClose();
  };

  return (
    <GeneralModal>
      <FormControl padding={"24px"}>
        <Heading
          color={"grey.0"}
          fontSize={"sm"}
          fontWeight={"semibold"}
          marginBottom={"17px"}
        >
          Editar anuncio
        </Heading>

        <Text marginBottom={"17px"}>Infomações do veículo</Text>

        <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="brand">
          Marca
        </FormLabel>
        <Input
          fontSize={"xs"}
          marginBottom={"30px"}
          id="brand"
          value={announcementView?.brand}
          isDisabled
          {...register("brand")}
        ></Input>
        <Text className="errorMessage">{errors.brand?.message}</Text>

        <FormLabel htmlFor="model" fontSize={"xs"} fontWeight={"bold"}>
          Modelo
        </FormLabel>
        <Input
          fontSize={"xs"}
          id="model"
          value={announcementView?.model}
          isDisabled
          type="text"
          {...register("model")}
        ></Input>
        <Text className="errorMessage">{errors.model?.message}</Text>

        <Flex>
          <Box marginRight={"7px"} marginTop={"30px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="year">
              Ano
            </FormLabel>
            <Input
              id="year"
              fontSize={"xs"}
              placeholder="2018"
              value={announcementView?.fabrication_year}
              isDisabled
              type="text"
              {...register("fabrication_year")}
            />
            <Text className="errorMessage" textStyle={"error"}>
              {errors.fabrication_year?.message}
            </Text>
          </Box>

          <Box marginLeft={"7px"} marginTop={"30px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="fuel">
              Combustível
            </FormLabel>
            <Input
              id="year"
              placeholder="Gasolina/Etanol"
              type="text"
              fontSize={"xs"}
              value={announcementView?.fuel_type}
              isDisabled
              {...register("fuel_type")}
            />
            <Text className="errorMessage" textStyle={"error"}>
              {errors.fuel_type?.message}
            </Text>
          </Box>
        </Flex>

        <Flex>
          <Box marginRight={"7px"} marginTop={"30px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="km">
              Quilometragem
            </FormLabel>
            <Input
              id="km"
              fontSize={"xs"}
              placeholder="30.000"
              defaultValue={announcementView?.km}
              type="text"
              {...register("km")}
            />
            <Text className="errorMessage" textStyle={"error"}>
              {errors.km?.message}
            </Text>
          </Box>

          <Box marginLeft={"7px"} marginTop={"30px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="color">
              Cor
            </FormLabel>
            <Input
              id="color"
              fontSize={"xs"}
              placeholder="Branco"
              defaultValue={announcementView?.color}
              type="text"
              {...register("color")}
            />
            <Text className="errorMessage" textStyle={"error"}>
              {errors.color?.message}
            </Text>
          </Box>
        </Flex>

        <Flex>
          <Box marginRight={"7px"} marginTop={"30px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="fipe">
              Preço tabela FIPE
            </FormLabel>
            <Input
              w={"225px"}
              fontSize={"xs"}
              id="fipe"
              placeholder="R$ 48.000,00"
              value={announcementView?.fipe.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              isDisabled
              type="text"
              {...register("fipe")}
            />
            <Text className="errorMessage" textStyle={"error"}>
              {errors.fipe?.message}
            </Text>
          </Box>

          <Box marginLeft={"7px"} marginTop={"30px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="price">
              Preço
            </FormLabel>
            <Input
              id="price"
              placeholder="R$ 50.000,00"
              type="text"
              fontSize={"xs"}
              defaultValue={announcementView?.price}
              {...register("price")}
            />
            <Text className="errorMessage" textStyle={"error"}>
              {errors.price?.message}
            </Text>
          </Box>
        </Flex>

        <Box marginTop={"30px"}>
          <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="description">
            Descrição
          </FormLabel>
          <Textarea
            fontSize={"xs"}
            id="description"
            placeholder="Descrição..."
            defaultValue={announcementView?.description}
            {...register("description")}
          ></Textarea>
          <Text className="errorMessage" textStyle={"error"}>
            {errors.description?.message}
          </Text>
        </Box>

        <Box marginTop={"30px"}>
          <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="coverImg">
            Imagem de capa
          </FormLabel>
          <Input
            id="coverImg"
            fontSize={"xs"}
            placeholder="https://image.com"
            type="text"
            {...register("cover_img")}
            defaultValue={announcementView?.cover_img}
          />
          <Text
            className="errorMessage"
            textStyle={"error"}
            marginBottom={"17px"}
          >
            {errors.cover_img?.message}
          </Text>
        </Box>

        {announcementView!.image.length > 0 &&
          announcementView!.image.map((image, index) => {
            return (
              <Box key={image.id}>
                <FormLabel
                  fontSize={"xs"}
                  fontWeight={"bold"}
                  htmlFor={`image${index}`}
                >
                  {`${index + 1}º Imagem da galeria`}
                </FormLabel>
                <Input
                  {...register("image")}
                  id={`image${index}`}
                  marginBottom={"30px"}
                  fontSize={"xs"}
                  placeholder="https://image.com"
                  defaultValue={image.imageUrl}
                />
              </Box>
            );
          })}

        <Flex marginTop={"56px"} justifyContent={"flex-end"} gap={"20px"}>
          <Button variant={"negative"} onClick={() => closeModal()}>
            Cancelar
          </Button>
          <Button
            variant={"alert"}
            onClick={() => setdeleteAnnounceModal(true)}
          >
            Excluir anuncio
          </Button>
          <Button variant={"brandDisable"} onClick={handleSubmit(onFormSubmit)}>
            Editar anuncio
          </Button>
        </Flex>

        {deleteAnnounceModal && (
          <GeneralModal>
            <Center width={"100%"}>
              <FormControl
                as={"form"}
                display={"flex"}
                flexDirection={"column"}
                gap={"2rem"}
                width={"80%"}
                padding={"15px"}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Heading variant={"healding_7_500"}>Excluir Anuncio</Heading>
                  <CloseButton
                    onClick={() => setdeleteAnnounceModal(!deleteAnnounceModal)}
                  />
                </Flex>

                <Heading variant={"healding_7_600"} textAlign={"center"}>
                  Deseja excluir o anuncio? esta ação não pode ser desfeita!
                </Heading>

                <Flex justifyContent={"space-around"}>
                  <Button variant={"sucess"} onClick={() => onDeleteAnnounce()}>
                    Sim
                  </Button>
                  <Button
                    variant={"alert"}
                    onClick={() => setdeleteAnnounceModal(!deleteAnnounceModal)}
                  >
                    Não
                  </Button>
                </Flex>
              </FormControl>
            </Center>
          </GeneralModal>
        )}
      </FormControl>
    </GeneralModal>
  );
};

export default EditOrDeleteAnnouncementModal;
