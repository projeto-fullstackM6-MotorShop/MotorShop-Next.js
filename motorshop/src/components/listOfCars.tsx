import { Flex, SimpleGrid, extendTheme } from "@chakra-ui/react";
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
          {currentCars.map((announcement) => {
            return (
              <AnnouceCard key={announcement.id} annoucement={announcement} />
            );
          })}
        </Flex>
      ) : (
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
      )}
    </>
  );
};

export default ListOfCars;
