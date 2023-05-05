import Header from "@/components/header";
import Footer from "../components/footer";
import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import FilterCard from "@/components/filterCard";
import ListOfCars from "@/components/listOfCars";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "react-responsive";
import { useAnnouncement } from "@/contexts/announcementContext";
import Pagination from "@/components/paginationAnnouncement";

const Home = () => {
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 1048 });

  return (
    <>
      <Header />
      <Flex
        h={"550px"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={"10px"}
        bgGradient={
          "linear-gradient(180deg, rgba(0, 0, 0, 0.29) 0%, #000000 100%);"
        }
        textAlign={"center"}
      >
        <Image
          src="/images/homeCar.png"
          alt="Logo"
          zIndex={"-1"}
          position={"absolute"}
          objectFit={"cover"}
          height={"25%"}
        />
        <Heading color={"grey.11"} fontWeight={"semibold"} fontSize={"xxxl"}>
          MotorShop
        </Heading>
        <Heading color={"grey.11"} fontWeight={"bold"} fontSize={"xxl"}>
          A melhor plataforma de anúncios de carro do país
        </Heading>
      </Flex>

      {isSmallScreen ? (
        <Flex p={"32px 16px"} gap={"32px"}>
          <FilterCard />
          <Box w={"100%"}>
            <ListOfCars />
          </Box>
        </Flex>
      ) : (
        <Flex p={"32px 16px"} gap={"32px"}>
          <Box w={"20%"}>
            <FilterCard />
          </Box>
          <Box w={"75%"}>
            <ListOfCars />
          </Box>
        </Flex>
      )}

      <Center p={"2rem 0"}>
        <Pagination />
      </Center>

      <Footer />
    </>
  );
};

export default Home;
