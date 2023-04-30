import { FilterContext } from "@/contexts/filterContext";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "@/contexts/authContext";

const FilterCard = () => {
  const {
    allModels,
    allColors,
    allYears,
    allFuelTypes,
    setClearFilter,
    setMinimumKm,
    minimumKm,
    setMaximumKm,
    maximumKm,
    setMinimumPrice,
    minimumPrice,
    setMaximumPrice,
    maximumPrice,
    filterBrand,
    getFilteredBrandCars,
    getFilteredPrice,
    getFilteredKm,
    getFilteredColor,
    getFilteredFuelTypeCars,
    getFilteredModelCars,
    getFilteredYear,
    isFilterActive,
    setIsFilterActive,
  } = useContext(FilterContext);

  const { getUserProfile } = useAuth();

  const {
    allBrands,
    getAllCars,
    setAllBrands,
    getAllAnnouncements,
    setAllAnnouncements,
    allAnnouncements,
  } = useAnnouncement();

  const [isButtonClearFilterActive, setIsButtonClearFilterActive] =
    useState(false);

  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 700 });

  const clearAllFilters = () => {
    getAllCars();
    getAllAnnouncements();
    setIsButtonClearFilterActive(false);
    setMinimumKm("");
    setMaximumKm("");
  };

  useEffect(() => {
    const filteredByKm = getFilteredKm(allAnnouncements);
    const filteredByPrice = getFilteredPrice(allAnnouncements);

    if (filteredByKm.length && filteredByPrice.length) {
      const filteredAnnouncements = filteredByKm.filter((car: any) =>
        filteredByPrice.includes(car)
      );
      setAllAnnouncements(filteredAnnouncements);
      filterBrand(filteredAnnouncements);
    } else if (filteredByKm.length) {
      setAllAnnouncements(filteredByKm);
      filterBrand(filteredByKm);
    } else if (filteredByPrice.length) {
      setAllAnnouncements(filteredByPrice);
      filterBrand(filteredByPrice);
    } else {
      getAllAnnouncements();
      clearAllFilters();
    }
  }, [minimumKm, maximumKm, minimumPrice, maximumPrice]);

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
            onChange={(e) => {
              setMinimumKm(e.target.value), setIsFilterActive(true);
              setClearFilter(true), setIsButtonClearFilterActive(true);
            }}
            placeholder="Minima"
            fontSize={"xs"}
            type="number"
            background={"grey.4"}
            width={"45%"}
            borderRadius={"3px"}
          ></Input>
          <Input
            onChange={(e) => {
              setMaximumKm(e.target.value), setIsFilterActive(true);
              setClearFilter(true), setIsButtonClearFilterActive(true);
            }}
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
            onChange={(e) => setMinimumPrice(e.target.value)}
            placeholder="Minimo"
            fontSize={"xs"}
            type="number"
            color={"grey.2"}
            background={"grey.4"}
            width={"45%"}
            borderRadius={"3px"}
          ></Input>
          <Input
            onChange={(e) => setMaximumPrice(e.target.value)}
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
