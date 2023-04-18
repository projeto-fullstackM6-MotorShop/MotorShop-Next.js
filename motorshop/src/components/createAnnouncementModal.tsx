import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import GeneralModal from "./generalModal";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useState } from "react";
import { ICarBrand } from "@/interfaces/annouce";
import dataCar from "../../../dataTeste";
import { useModal } from "@/contexts/modalContext";

const CreateAnnouncementModal = () => {
  const { allCars, getAllCars, allBrands } = useAnnouncement();
  const { isOpen, onClose, onOpen } = useModal();
  const [selectedBrand, setSelectedBrand] = useState("chevrolet" as any);
  const allCarsArr = [allCars];
  const allSelectedBrandsCars = [allCars[selectedBrand]];
  const [selectedCar, setSelectedCar] = useState("" as any);
  const [fipeValue, setFipeValue] = useState("" as any);

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

  return (
    <GeneralModal>
      <FormControl>
        <Heading color={"grey.0"} fontSize={"xs"} fontWeight={"semibold"}>
          Criar anuncio
        </Heading>
        <Text>Infomações do veículo</Text>
        <FormLabel htmlFor="brand">Marca</FormLabel>
        <Select onChange={(e) => setSelectedBrand(e.target.value)}>
          {allBrands.map((brand) => {
            return (
              <option value={brand} key={brand}>
                {brand}
              </option>
            );
          })}
        </Select>
        <FormLabel htmlFor="brand">Model</FormLabel>
        <Select
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
        <Box>
          <FormLabel htmlFor="year">Ano</FormLabel>
          <Input placeholder="2018" />
          <FormLabel htmlFor="fuel">Combustível</FormLabel>
          <Input placeholder="Gasolina/Etanol" />
        </Box>
        <Box>
          <FormLabel htmlFor="km">Quilometragem</FormLabel>
          <Input placeholder="30.000" />
          <FormLabel htmlFor="color">Cor</FormLabel>
          <Input placeholder="Branco" />
        </Box>
        <Box>
          <FormLabel htmlFor="fipe">Preço tabela FIPE</FormLabel>
          <Input
            placeholder="R$ 48.000,00"
            defaultValue={formattedFipeValue}
            isDisabled={true}
          />
          <FormLabel htmlFor="price">Preço</FormLabel>
          <Input placeholder="R$ 50.000,00" />
        </Box>
        <FormLabel htmlFor="description">Descrição</FormLabel>
        <Textarea placeholder="Descrição..."></Textarea>

        <FormLabel htmlFor="coverImg">Imagem de capa</FormLabel>
        <Input placeholder="https://image.com" />

        <FormLabel htmlFor="image1">1º Imagem da galeria</FormLabel>
        <Input placeholder="https://image.com" />

        <FormLabel htmlFor="image2">2º Imagem da galeria</FormLabel>
        <Input placeholder="https://image.com" />

        <Box>
          <Button onClick={onClose}>Cancelar</Button>
          <Button>Criar anuncio</Button>
        </Box>
      </FormControl>
    </GeneralModal>
  );
};

export default CreateAnnouncementModal;
