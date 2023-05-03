/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import GeneralModal from "./generalModal";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useEffect, useState } from "react";
import dataCar from "../../../dataTeste";
import { useModal } from "@/contexts/modalContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAnnouncementRequest } from "@/interfaces/annoucement";

const EditOrDeleteAnnouncementModal = (data:any) => {

  const { allCars, allBrands, editAnnouncement, announcementView, getAnnouncementById } = useAnnouncement();
  const { onClose } = useModal();

  const [selectedBrand, setSelectedBrand] = useState("chevrolet" as any);
  const allSelectedBrandsCars = [allCars[selectedBrand]];
  const [selectedCar, setSelectedCar] = useState("");
  const [fipeValue, setFipeValue] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [yearValue, setYearValue] = useState("" as any);
  let [counter, setCounter] = useState(2);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    getFipe();
    setCounter(2);     
    getAnnouncementById(data.id)
  }, [selectedCar]);

  const fipeToFormatt = +fipeValue;
  const formattedFipeValue = fipeToFormatt.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const getFipe = () => {
    dataCar.filter((car) => {
      if (car.modelo.toLowerCase() === selectedCar.toLowerCase()) {
        setFipeValue(car.valor);
        setFuelType(car.type);
        setYearValue(car.ano);
      }
    });
  };

  const addImageField = () => {
    if (counter < 6) {
      setCounter(counter + 1);
    }
  };

  const closeModal = () => {
    setCounter(2);
    onClose();
  };

  const formschema = yup.object().shape({
    brand: yup.string().notRequired(),
    model: yup.string().notRequired(),
    fabrication_year: yup.string(),
    km: yup.string().notRequired(),
    color: yup.string().notRequired(),
    fuel_type: yup.string(),
    price: yup.string().notRequired(),
    fipe: yup.string(),
    description: yup.string().notRequired(),
    cover_img: yup
      .string()
      .notRequired()
    // image: yup.string().notRequired(),
    // image2: yup.string().notRequired(),
    // image3: yup.string().notRequired(),
    // image4: yup.string().notRequired(),
    // image5: yup.string().notRequired(),
    // image6: yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnnouncementRequest>({
    resolver: yupResolver(formschema),
  });

  const onFormSubmit = (formData: IAnnouncementRequest) => {
    editAnnouncement(formData);
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
        >       
        </Input>
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
        >   
        </Input>
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
              value={formattedFipeValue}
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
          />
          <Text
            className="errorMessage"
            textStyle={"error"}
            marginBottom={"17px"}
          >
            {errors.cover_img?.message}
          </Text>
        </Box>

        <>
          <FormLabel
            fontSize={"xs"}
            fontWeight={"bold"}
            htmlFor={`image{imgNumber}`}
          >
            1º Imagem da galeria
          </FormLabel>
          <Input
            // {...register("image")}
            marginBottom={"30px"}
            fontSize={"xs"}
            placeholder="https://image.com"
          />
        </>

        <>
          <FormLabel
            fontSize={"xs"}
            fontWeight={"bold"}
            htmlFor={`image{imgNumber}`}
          >
            2º Imagem da galeria
          </FormLabel>
          <Input
            // {...register("image2")}
            marginBottom={"30px"}
            fontSize={"xs"}
            placeholder="https://image.com"
          />
        </>
        {counter >= 3 && (
          <>
            <FormLabel
              fontSize={"xs"}
              fontWeight={"bold"}
              htmlFor={`image{imgNumber}`}
            >
              3º Imagem da galeria
            </FormLabel>
            <Input
              // {...register("image3")}
              marginBottom={"30px"}
              fontSize={"xs"}
              placeholder="https://image.com"
            />
          </>
        )}
        {counter >= 4 && (
          <>
            <FormLabel
              fontSize={"xs"}
              fontWeight={"bold"}
              htmlFor={`image{imgNumber}`}
            >
              4º Imagem da galeria
            </FormLabel>
            <Input
              // {...register("image4")}
              marginBottom={"30px"}
              fontSize={"xs"}
              placeholder="https://image.com"
            />
          </>
        )}
        {counter >= 5 && (
          <>
            <FormLabel
              fontSize={"xs"}
              fontWeight={"bold"}
              htmlFor={`image{imgNumber}`}
            >
              5º Imagem da galeria
            </FormLabel>
            <Input
              // {...register("image5")}
              marginBottom={"30px"}
              fontSize={"xs"}
              placeholder="https://image.com"
            />
          </>
        )}
        {counter >= 6 && (
          <>
            <FormLabel
              fontSize={"xs"}
              fontWeight={"bold"}
              htmlFor={`image{imgNumber}`}
            >
              6º Imagem da galeria
            </FormLabel>
            <Input
              // {...register("image6")}
              marginBottom={"30px"}
              fontSize={"xs"}
              placeholder="https://image.com"
            />
          </>
        )}

        <Button
          variant={"outlineBrand1"}
          border={"none"}
          onClick={() => addImageField()}
        >
          Adicionar campo para imagem da galeria
        </Button>

        <Flex marginTop={"56px"} justifyContent={"flex-end"} gap={"20px"}>
          <Button variant={"negative"} onClick={() => closeModal()}>
            Cancelar
          </Button>
          <Button variant={"brandDisable"} onClick={handleSubmit(onFormSubmit)}>
            Criar anuncio
          </Button>
        </Flex>
      </FormControl>
    </GeneralModal>
  );
};

export default EditOrDeleteAnnouncementModal;
