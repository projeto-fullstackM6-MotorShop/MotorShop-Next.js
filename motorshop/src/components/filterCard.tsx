import { FilterContext } from "@/contexts/filterContext";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "@/contexts/authContext";
import { IAnnouceInterface } from "@/interfaces/annouce";

const FilterCard = () => {
  const {
    allModels,
    allColors,
    allYears,
    allFuelTypes,
    getAllModels,
    setAllModels,
  } = useContext(FilterContext);
  const { getUserProfile } = useAuth();
  const {
    allBrands,
    getAllCars,
    setAllBrands,
    getAllAnnouncements,
    allCars,
    setAllCars,
    allAnnouncements,
    setAllAnnouncements,
  } = useAnnouncement();

  const [clearFilter, setClearFilter] = useState(false);
  const [isButtonClearFilterActive, setIsButtonClearFilterActive] =
    useState(false);
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 700 });
  const [isFilterActive, setIsFilterActive] = useState(false);

  const clearAllFilters = () => {
    getAllCars();
    getAllAnnouncements();
    setIsButtonClearFilterActive(false);
  };

  const getFilteredBrandCars = (brand: string) => {
    const filteredAnnouncements = allAnnouncements.filter((announcement) => {
      return announcement.brand.toLowerCase() === brand.toLowerCase();
    });
    setAllAnnouncements(filteredAnnouncements);
  };

  const getFilteredYear = (year: string) => {
    const filteredYears = allAnnouncements.filter((announcement) => {
      return announcement.fabrication_year.toLowerCase() === year.toLowerCase();
    });

    setAllAnnouncements(filteredYears);

    const filteredBrands: any = filteredYears.map(
      (announcement) => announcement.brand
    );
    setAllBrands(filteredBrands);
  };

  const getFilteredModelCars = (model: string) => {
    const filteredAnnouncements = allAnnouncements.filter((announcement) => {
      return (
        announcement.model.split(" ")[0].toLowerCase() === model.toLowerCase()
      );
    });
    setAllAnnouncements(filteredAnnouncements);

    const filteredBrands: any = filteredAnnouncements.map(
      (announcement) => announcement.brand
    );
    setAllBrands(filteredBrands);
  };
  const getFilteredFuelTypeCars = (fuelType: string) => {
    const filteredYears = allAnnouncements.filter((announcement) => {
      return announcement.fuel_type.toLowerCase() === fuelType.toLowerCase();
    });

    setAllAnnouncements(filteredYears);

    const filteredBrands: any = filteredYears.map(
      (announcement) => announcement.brand
    );
    setAllBrands(filteredBrands);
  };

  const getFilteredColor = (color: string) => {
    const filteredAnnouncements = allAnnouncements.filter((announcement) => {
      return announcement.color.toLowerCase() === color.toLowerCase();
    });
    setAllAnnouncements(filteredAnnouncements);

    const filteredBrands: any = filteredAnnouncements.map(
      (announcement) => announcement.brand
    );
    setAllBrands(filteredBrands);
  };

  useEffect(() => {
    getAllCars();
    getUserProfile();
    getAllAnnouncements();
  }, []);

  return (
    <>
      <Flex justify="start" flexDirection="column" marginLeft={"20px"}>
        <Heading
          marginTop={"17px"}
          fontSize="sm"
          fontFamily="heading"
          fontWeight="bold"
          color={"grey.0"}
        >
          Marca
        </Heading>
        <Box marginTop={"5px"}>
          {allBrands.map((brand) => {
            return (
              <Text
                onClick={() => {
                  setAllBrands([brand]);
                  getFilteredBrandCars(brand);
                  setIsFilterActive(true);
                  setClearFilter(true), setIsButtonClearFilterActive(true);
                }}
                fontSize="xs"
                fontFamily="heading"
                fontWeight="bold"
                color={"grey.3"}
                key={brand}
                cursor={"pointer"}
              >
                {brand === "chevrolet" ? "General Motors" : brand}
              </Text>
            );
          })}
        </Box>
        <Heading
          marginTop={"17px"}
          fontSize="sm"
          fontFamily="heading"
          fontWeight="bold"
          color={"grey.0"}
        >
          Modelo
        </Heading>
        <Box marginTop={"5px"}>
          {allModels.map((model) => {
            return (
              <Text
                onClick={() => {
                  getFilteredModelCars(model), setIsFilterActive(true);
                  setClearFilter(true), setIsButtonClearFilterActive(true);
                }}
                fontSize="xs"
                fontFamily="heading"
                fontWeight="semibold"
                color={"grey.3"}
                key={model}
                cursor={"pointer"}
              >
                {model}
              </Text>
            );
          })}
        </Box>
        <Heading
          marginTop={"17px"}
          fontSize="sm"
          fontFamily="heading"
          fontWeight="bold"
          color={"grey.0"}
        >
          Cor
        </Heading>
        <Box marginTop={"5px"}>
          {allColors.map((color) => {
            return (
              <Text
                onClick={() => {
                  getFilteredColor(color), setIsFilterActive(true);
                  setClearFilter(true), setIsButtonClearFilterActive(true);
                }}
                fontSize="xs"
                fontFamily="heading"
                fontWeight="semibold"
                color={"grey.3"}
                key={color}
                cursor={"pointer"}
              >
                {color}
              </Text>
            );
          })}
        </Box>
        <Heading
          marginTop={"17px"}
          fontSize="sm"
          fontFamily="heading"
          fontWeight="semibold"
          color={"grey.0"}
        >
          Ano
        </Heading>
        <Box marginTop={"5px"}>
          {allYears.map((model) => {
            return (
              <Text
                onClick={() => {
                  getFilteredYear(model), setIsFilterActive(true);
                  setClearFilter(true), setIsButtonClearFilterActive(true);
                }}
                fontSize="xs"
                fontFamily="heading"
                fontWeight="semibold"
                color={"grey.3"}
                key={model}
                cursor={"pointer"}
              >
                {model}
              </Text>
            );
          })}
        </Box>
        <Heading
          marginTop={"17px"}
          fontSize="sm"
          fontFamily="heading"
          fontWeight="semibold"
          color={"grey.0"}
        >
          Combustível
        </Heading>
        <Box marginTop={"5px"}>
          {allFuelTypes.map((model) => {
            return (
              <Heading
                onClick={() => {
                  getFilteredFuelTypeCars(model), setIsFilterActive(true);
                  setClearFilter(true), setIsButtonClearFilterActive(true);
                }}
                fontSize="xs"
                fontFamily="heading"
                fontWeight="semibold"
                color={"grey.3"}
                key={model}
                cursor={"pointer"}
              >
                {model}
              </Heading>
            );
          })}
        </Box>
        <Heading
          marginTop={"17px"}
          fontSize="sm"
          fontFamily="heading"
          fontWeight="semibold"
          color={"grey.0"}
          mb={"5px"}
        >
          Km
        </Heading>

        <Flex width={"90%"} justify={"space-between"} maxW={"250px"}>
          <Input
            placeholder="Minima"
            fontSize={"xs"}
            type="number"
            background={"grey.4"}
            width={"45%"}
            borderRadius={"3px"}
          ></Input>
          <Input
            placeholder="Máxima"
            fontSize={"xs"}
            type="number"
            background={"grey.4"}
            width={"45%"}
            borderRadius={"3px"}
          ></Input>
        </Flex>
        <Heading
          marginTop={"17px"}
          fontSize="sm"
          fontFamily="heading"
          fontWeight="semibold"
          color={"grey.0"}
          mb={"5px"}
        >
          Preço
        </Heading>
        <Flex width={"90%"} justify={"space-between"} maxW={"250px"}>
          <Input
            placeholder="Minimo"
            fontSize={"xs"}
            type="number"
            color={"grey.2"}
            background={"grey.4"}
            width={"45%"}
            borderRadius={"3px"}
          ></Input>
          <Input
            placeholder="Máximo"
            fontSize={"xs"}
            type="number"
            color={"grey.2"}
            background={"grey.4"}
            width={"45%"}
            borderRadius={"3px"}
          ></Input>
        </Flex>
        <Box width={"100%"}>
          {isSmallScreen && (
            <Button
              background={"brand.1"}
              color={"brand.4"}
              m={"10px"}
              fontSize={"sm"}
              width={"90%"}
              maxW={"225px"}
              alignSelf={"center"}
            >
              Ver anúncios
            </Button>
          )}

          {isButtonClearFilterActive && (
            <Button
              background={"brand.1"}
              color={"brand.4"}
              m={"10px"}
              fontSize={"sm"}
              width={"90%"}
              maxW={"225px"}
              alignSelf={"center"}
              onClick={() => {
                clearAllFilters(), getAllAnnouncements();
              }}
            >
              Limpar Filtros
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default FilterCard;
