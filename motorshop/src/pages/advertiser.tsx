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
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useAuth } from "@/contexts/authContext";
import Pagination from "@/components/paginationAnnouncement";

const Advertiser = () => {
  const { onOpen, isOpen } = useModal();
  const { user } = useAuth()
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
            {user?.name}
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
          {user?.description}
        </Text>
        <Button
          onClick={opencreateAnnouncementModal}
          variant={"outlineBrand1"}
          w={"160px"}
        >
          Criar anuncio
        </Button>
      </Flex>
      <Flex
        bgColor={"grey.8"}
        paddingTop={{ base: "386px", lg: "267px" }}
        marginTop={"-407px"}
        direction={'column'}
        alignItems={'center'}
      >
        <ListOfCars />

        <Center p={"2rem 0"}>
          <Pagination />
        </Center>
      </Flex>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const token = cookies["@motorshop:token"];

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Advertiser;
