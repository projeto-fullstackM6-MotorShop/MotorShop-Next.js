import Footer from "@/components/footer";
import Header from "@/components/header";
import ListOfCars from "@/components/listOfCars";
import { ChevronRightIcon } from "@chakra-ui/icons";
import AvatarIcon from "@/components/avatarIcon";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useModal } from "@/contexts/modalContext";
import CreateAnnouncementModal from "@/components/createAnnouncementModal";
import { useEffect } from "react";
import { useAnnouncement } from "@/contexts/announcementContext";
import CreateAnnouncementSucessModal from "@/components/createAnnouncementSucessModal";

const Advertiser = () => {
  const { onOpen, isOpen } = useModal();
  const {
    getAllCars,
    allCars,
    isCreateAnnouncementSucessOpen,
    setIsCreateAnnouncementOpen,
    isCreateAnnouncementOpen,
  } = useAnnouncement();

  useEffect(() => {
    getAllCars();
  }, []);

  const opencreateAnnouncementModal = () => {
    setIsCreateAnnouncementOpen(true);
    onOpen();
  };

  return (
    <>
      <Header />
      {isCreateAnnouncementOpen && <CreateAnnouncementModal />}
      {isCreateAnnouncementSucessOpen && <CreateAnnouncementSucessModal />}
      <Box h={"277px"} bgColor={"brand.1"}></Box>
      <Flex
        paddingLeft={"28px"}
        paddingRight={"28px"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        borderRadius={"4px"}
        bgColor={"grey.10"}
        w={{ base: "90%", lg: "81%" }}
        h={"406px"}
        position={"relative"}
        top={"-214px"}
        margin={"auto"}
        zIndex={"1000"}
      >
        <AvatarIcon size={"xl"} />
        <Flex alignItems={"center"}>
          <Heading as={"h6"} variant={"healding_6_600"} marginRight={"9px"}>
            Clayson Roberto Eufrasio
          </Heading>
          <Flex
            borderRadius={"4px"}
            bgColor={"brand.4"}
            h={"32px"}
            w={"92px"}
            alignItems={"center"}
            justifyContent={"center"}
            textStyle={"body_2_500"}
            color={"brand.1"}
          >
            Anunciante
          </Flex>
        </Flex>
        <Text textAlign={"start"} textStyle={"body_1_400"}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industries
        </Text>
        <Button
          onClick={opencreateAnnouncementModal}
          variant={"outlineBrand1"}
          w={"160px"}
        >
          Criar anuncio
        </Button>
      </Flex>
      <Box
        bgColor={"grey.8"}
        paddingTop={{ base: "386px", lg: "267px" }}
        marginTop={"-407px"}
      >
        <ListOfCars />

        <Center p={"2rem 0"}>
          <Flex
            gap={"2rem"}
            alignItems={"center"}
            flexDirection={{ base: "column", lg: "row" }}
          >
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
      </Box>
    </>
  );
};

export default Advertiser;
