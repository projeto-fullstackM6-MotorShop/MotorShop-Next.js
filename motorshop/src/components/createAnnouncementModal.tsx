import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import GeneralModal from "./generalModal";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useState } from "react";
import { ICarBrand } from "@/interfaces/annouce";
import dataCar from "../../../dataTeste";

const CreateAnnouncementModal = () => {
  const { allCars, getAllCars, allBrands } = useAnnouncement();
  const [selectedBrand, setSelectedBrand] = useState("" as any);
  const allCarsArr = [allCars];
  const allSelectedBrandsCars = [allCars[selectedBrand]];
  // const [selectedCar, setSelectedCar] = useState("" as any);
  // const fipeValue = dataCar.filter((car) => {
  //   if (car.marca === selectedCar) {
  //     return car.valor;
  //   }
  // });

  // console.log(fipeValue);

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
        <Select>
          {allSelectedBrandsCars.map((car: any) => {
            return car.map((element: any) => {
              return <option key={element.name}>{element.name}</option>;
            });
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
          <FormLabel htmlFor="year">Ano</FormLabel>
          <Input placeholder="2018" />
          <FormLabel htmlFor="price">Preço</FormLabel>
          <Input placeholder="R$ 50.000,00" />
        </Box>
      </FormControl>
    </GeneralModal>
  );
};

export default CreateAnnouncementModal;
