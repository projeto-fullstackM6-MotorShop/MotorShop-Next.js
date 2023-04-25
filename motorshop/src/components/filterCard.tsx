import { FilterContext } from "@/contexts/filterContext";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "@/contexts/authContext";

const FilterCard = () => {
  const { allModels, allColors, allYears, allFuels } =
    useContext(FilterContext);
  const { getUserProfile } = useAuth();
  const { allBrands, getAllCars, setAllBrands, getAllAnnouncements } =
    useAnnouncement();

  const [clearFilter, setClearFilter] = useState(false);
  const [isButtonClearFilterActive, setIsButtonClearFilterActive] =
    useState(false);
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 700 });

  useEffect(() => {
    getAllCars();
    getUserProfile();
    getAllAnnouncements();
  }, []);

  const clearAllFilters = () => {
    getAllCars();
    setIsButtonClearFilterActive(false);
  };

  return (
    <>
      <Flex justify="start" flexDirection="column" marginLeft={"20px"}>
        <Heading
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
                  setAllBrands([brand]),
                    setClearFilter(true),
                    setIsButtonClearFilterActive(true);
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
          fontSize="sm"
          fontFamily="heading"
          fontWeight="bold"
          color={"grey.0"}
        >
          Cor
        </Heading>
        <Box marginTop={"5px"}>
          {allColors.map((model) => {
            return (
              <Text
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
          fontSize="sm"
          fontFamily="heading"
          fontWeight="semibold"
          color={"grey.0"}
        >
          Combustível
        </Heading>
        <Box marginTop={"5px"}>
          {allFuels.map((model) => {
            return (
              <Heading
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
              onClick={() => clearAllFilters()}
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
