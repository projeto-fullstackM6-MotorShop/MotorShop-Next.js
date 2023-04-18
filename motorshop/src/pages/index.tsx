import Header from "@/components/header";
import Footer from "../components/footer";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import FilterCard from "@/components/filterCard";
import ListOfCars from "@/components/listOfCars";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useEffect } from "react";
import CreateAnnouncementModal from "@/components/createAnnouncementModal";
import { useModal } from "@/contexts/modalContext";

const Home = () => {
  const { allCars, getAllCars } = useAnnouncement();
  const { isOpen, onClose, onOpen } = useModal();

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <>
      <Header />
      <Button onClick={onOpen}>Clicar</Button>
      <CreateAnnouncementModal></CreateAnnouncementModal>
      <Flex
        h={"550px"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={"10px"}
        bgGradient={
          "linear-gradient(180deg, rgba(0, 0, 0, 0.29) 0%, #000000 100%);"
        }
      >
        <Image
          src="/images/homeCar.png"
          alt="Logo"
          zIndex={"-1"}
          position={"absolute"}
        />
        <Heading color={"grey.11"} fontWeight={"semibold"} fontSize={"xxxl"}>
          MotorShop
        </Heading>
        <Heading color={"grey.11"} fontWeight={"bold"} fontSize={"xxl"}>
          A melhor plataforma de anúncios de carro do país
        </Heading>
      </Flex>

      <Flex p={"32px 16px"} gap={"32px"}>
        <Box w={"20%"}>
          <FilterCard />
        </Box>
        <Box w={"75%"}>
          <ListOfCars />
        </Box>
      </Flex>

      <Center p={"2rem 0"}>
        <Flex gap={"2rem"} alignItems={"center"}>
          <Heading color={"grey.3"} fontSize={"md"} fontWeight={"semibold"}>
            1 de 2
          </Heading>
          <Button
            rightIcon={<ChevronRightIcon />}
            variant={"unstyled"}
            bg={"transparent"}
            color={"brand.1"}
            fontSize={"md"}
            iconSpacing={1}
            display={"flex"}
            alignItems={"center"}
          >
            Seguinte
          </Button>
        </Flex>
      </Center>

      <Footer />
    </>
  );
};

export default Home;
