import { Flex, SimpleGrid, Text, extendTheme } from "@chakra-ui/react";
import AnnouceCard from "./annoucementCard";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useMediaQuery } from "react-responsive";

const ListOfCars = () => {
  const { currentCars } = useAnnouncement();

  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 1048 });

  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "1000px",
    xl: "1800px",
    "2xl": "1900px",
  };

  const theme = extendTheme({ breakpoints });

  return (
    <>
      {isSmallScreen ? (
        <Flex
          mt={"20px"}
          w={"100%"}
          height={"500px"}
          flexDirection={"row"}
          overflow={"auto"}
          gap={"20px"}
        >
          {currentCars.length ? (
            currentCars.map((announcement) => {
              return (
                <AnnouceCard key={announcement.id} annoucement={announcement} />
              );
            })
          ) : (
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
              width={"100%"}
            >
              <Text fontSize={"sm"} color={"grey.4"} alignSelf={"center"}>
                Ainda não há anuncios cadastrados
              </Text>
            </Flex>
          )}
        </Flex>
      ) : currentCars.length ? (
        <SimpleGrid
          columns={{ base: 2, lg: 2, xl: 3, "2xl": 4 }}
          spacing={30}
          mt={"20px"}
          w={"90%"}
        >
          {currentCars.map((announcement) => {
            return (
              <AnnouceCard key={announcement.id} annoucement={announcement} />
            );
          })}
        </SimpleGrid>
      ) : (
        <Flex alignItems={"center"} justifyContent={"center"} height={"100%"}>
          <Text fontSize={"sm"} color={"grey.4"}>
            Ainda não há anuncios cadastrados
          </Text>
        </Flex>
      )}
    </>
  );
};

export default ListOfCars;
