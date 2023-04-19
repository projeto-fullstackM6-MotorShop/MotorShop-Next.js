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
import AnnouncementImage from "./announcementImage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAnnouncementRequest } from "@/interfaces/annouce";

const CreateAnnouncementModal = () => {
  const { allCars, allBrands, CreateAnnouncement } = useAnnouncement();
  const { onClose } = useModal();
  const [selectedBrand, setSelectedBrand] = useState("chevrolet" as any);
  const allSelectedBrandsCars = [allCars[selectedBrand]];
  const [selectedCar, setSelectedCar] = useState("");
  const [fipeValue, setFipeValue] = useState("");
  let [counter, setCounter] = useState(2);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    getFipe();
    setCounter(2);
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
      }
    });
  };

  const addImageField = () => {
    if (counter < 6) {
      setCounter(counter + 1);
    }
  };

  const formschema = yup.object().shape({
    brand: yup.string().required("Escolha uma marca."),
    model: yup.string().required("Escolha o modelo."),
    fabrication_year: yup.string().required("Informe o ano de fabricação."),
    km: yup.string().required("Informe a quilometragem."),
    color: yup.string().required("Informe a cor do veículo."),
    fuel_type: yup.string().required("Informe o tipo de combustível."),
    price: yup.string().required("Informe o preço do veículo."),
    fipe: yup.string().default(fipeValue),
    description: yup.string().required("Descreva o veículo."),
    cover_img: yup
      .string()
      .required("Adicione uma foto de capa para o anuncio."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAnnouncementRequest>({
    resolver: yupResolver(formschema),
  });

  const onFormSubmit = (formData: IAnnouncementRequest) => {
    CreateAnnouncement(formData);
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
          Criar anuncio
        </Heading>

        <Text marginBottom={"17px"}>Infomações do veículo</Text>

        <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="brand">
          Marca
        </FormLabel>
        <Select
          fontSize={"xs"}
          marginBottom={"30px"}
          id="brand"
          {...register("brand")}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {allBrands.map((brand) => {
            return (
              <option value={brand} key={brand}>
                {brand}
              </option>
            );
          })}
        </Select>
        <Text color={"red"} className="errorMessage">
          {errors.brand?.message}
        </Text>

        <FormLabel htmlFor="model" fontSize={"xs"} fontWeight={"bold"}>
          Modelo
        </FormLabel>
        <Select
          fontSize={"xs"}
          marginBottom={"30px"}
          id="model"
          {...register("model")}
          onChange={(e) => {
            setSelectedCar(e.target.value), getFipe();
          }}
        >
          {allSelectedBrandsCars.map((car: any) => {
            return (
              car &&
              car.map((element: any) => {
                return <option key={element.name}>{element.name}</option>;
              })
            );
          })}
        </Select>
        <Text className="errorMessage">{errors.model?.message}</Text>

        <Flex>
          <Box marginRight={"7px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="year">
              Ano
            </FormLabel>
            <Input
              marginBottom={"40px"}
              id="year"
              placeholder="2018"
              type="text"
              {...register("fabrication_year")}
            />
            <Text className="errorMessage">
              {errors.fabrication_year?.message}
            </Text>
          </Box>

          <Box marginLeft={"7px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="fuel">
              Combustível
            </FormLabel>
            <Input
              marginBottom={"30px"}
              id="year"
              placeholder="Gasolina/Etanol"
              type="text"
              {...register("fuel_type")}
            />
            <Text className="errorMessage">{errors.fuel_type?.message}</Text>
          </Box>
        </Flex>

        <Flex>
          <Box marginRight={"7px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="km">
              Quilometragem
            </FormLabel>
            <Input
              marginBottom={"30px"}
              id="km"
              placeholder="30.000"
              type="text"
              {...register("km")}
            />
            <Text className="errorMessage">{errors.km?.message}</Text>
          </Box>

          <Box marginLeft={"7px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="color">
              Cor
            </FormLabel>
            <Input
              marginBottom={"30px"}
              id="color"
              placeholder="Branco"
              type="text"
              {...register("color")}
            />
            <Text className="errorMessage">{errors.color?.message}</Text>
          </Box>
        </Flex>

        <Flex>
          <Box marginRight={"7px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="fipe">
              Preço tabela FIPE
            </FormLabel>
            <Input
              w={"225px"}
              fontSize={"xs"}
              marginBottom={"30px"}
              id="fipe"
              placeholder="R$ 48.000,00"
              value={formattedFipeValue}
              isDisabled
              type="text"
              {...register("fipe")}
            />
            <Text className="errorMessage">{errors.fipe?.message}</Text>
          </Box>

          <Box marginLeft={"7px"}>
            <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="price">
              Preço
            </FormLabel>
            <Input
              marginBottom={"30px"}
              id="price"
              placeholder="R$ 50.000,00"
              type="text"
              {...register("price")}
            />
            <Text className="errorMessage">{errors.price?.message}</Text>
          </Box>
        </Flex>

        <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="description">
          Descrição
        </FormLabel>
        <Textarea
          fontSize={"xs"}
          marginBottom={"30px"}
          id="description"
          placeholder="Descrição..."
          {...register("description")}
        ></Textarea>
        <Text className="errorMessage">{errors.description?.message}</Text>

        <FormLabel fontSize={"xs"} fontWeight={"bold"} htmlFor="coverImg">
          Imagem de capa
        </FormLabel>
        <Input
          marginBottom={"30px"}
          id="coverImg"
          placeholder="https://image.com"
          type="text"
          {...register("cover_img")}
        />
        <Text className="errorMessage">{errors.cover_img?.message}</Text>

        <AnnouncementImage marginBottom={"30px"} imgNumber={1} />
        <AnnouncementImage marginBottom={"30px"} imgNumber={2} />
        {counter >= 3 && <AnnouncementImage imgNumber={3} />}
        {counter >= 4 && <AnnouncementImage imgNumber={4} />}
        {counter >= 5 && <AnnouncementImage imgNumber={5} />}
        {counter >= 6 && <AnnouncementImage imgNumber={6} />}

        <Button
          variant={"outlineBrand1"}
          border={"none"}
          onClick={() => addImageField()}
        >
          Adicionar campo para imagem da galeria
        </Button>

        <Flex marginTop={"56px"} justifyContent={"flex-end"} gap={"20px"}>
          <Button variant={"negative"} onClick={onClose}>
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

export default CreateAnnouncementModal;
