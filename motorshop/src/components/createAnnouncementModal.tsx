import {
  Box,
  Button,
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
import { useState } from "react";
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
      <FormControl>
        <Heading color={"grey.0"} fontSize={"xs"} fontWeight={"semibold"}>
          Criar anuncio
        </Heading>

        <Text>Infomações do veículo</Text>

        <FormLabel htmlFor="brand">Marca</FormLabel>
        <Select
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
        <p className="errorMessage">{errors.brand?.message}</p>

        <FormLabel htmlFor="model">Model</FormLabel>
        <Select
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
        <p className="errorMessage">{errors.model?.message}</p>

        <Box>
          <FormLabel htmlFor="year">Ano</FormLabel>
          <Input
            id="year"
            placeholder="2018"
            type="text"
            {...register("fabrication_year")}
          />
          <p className="errorMessage">{errors.fabrication_year?.message}</p>

          <FormLabel htmlFor="fuel">Combustível</FormLabel>
          <Input
            id="year"
            placeholder="Gasolina/Etanol"
            type="text"
            {...register("fuel_type")}
          />
          <p className="errorMessage">{errors.fuel_type?.message}</p>
        </Box>

        <Box>
          <FormLabel htmlFor="km">Quilometragem</FormLabel>
          <Input id="km" placeholder="30.000" type="text" {...register("km")} />
          <p className="errorMessage">{errors.km?.message}</p>

          <FormLabel htmlFor="color">Cor</FormLabel>
          <Input
            id="color"
            placeholder="Branco"
            type="text"
            {...register("color")}
          />
          <p className="errorMessage">{errors.color?.message}</p>
        </Box>

        <Box>
          <FormLabel htmlFor="fipe">Preço tabela FIPE</FormLabel>
          <Input
            id="fipe"
            placeholder="R$ 48.000,00"
            defaultValue={formattedFipeValue}
            isDisabled
            type="text"
            {...register("fipe")}
          />
          <p className="errorMessage">{errors.fipe?.message}</p>

          <FormLabel htmlFor="price">Preço</FormLabel>
          <Input
            id="price"
            placeholder="R$ 50.000,00"
            type="text"
            {...register("price")}
          />
          <p className="errorMessage">{errors.price?.message}</p>
        </Box>

        <FormLabel htmlFor="description">Descrição</FormLabel>
        <Textarea
          id="description"
          placeholder="Descrição..."
          {...register("description")}
        ></Textarea>
        <p className="errorMessage">{errors.description?.message}</p>

        <FormLabel htmlFor="coverImg">Imagem de capa</FormLabel>
        <Input
          id="coverImg"
          placeholder="https://image.com"
          type="text"
          {...register("cover_img")}
        />
        <p className="errorMessage">{errors.cover_img?.message}</p>

        <AnnouncementImage imgNumber={1} />
        <AnnouncementImage imgNumber={2} />
        {counter >= 3 && <AnnouncementImage imgNumber={3} />}
        {counter >= 4 && <AnnouncementImage imgNumber={4} />}
        {counter >= 5 && <AnnouncementImage imgNumber={5} />}
        {counter >= 6 && <AnnouncementImage imgNumber={6} />}

        <Button onClick={() => addImageField()}>
          Adicionar campo para imagem da galeria
        </Button>

        <Box>
          <Button
            onClick={() => {
              setCounter(2), onClose;
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit(onFormSubmit)}>Criar anuncio</Button>
        </Box>
      </FormControl>
    </GeneralModal>
  );
};

export default CreateAnnouncementModal;
