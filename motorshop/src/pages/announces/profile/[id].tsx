import AnnouceCard from "@/components/annoucementCard";
import AvatarIcon from "@/components/avatarIcon";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useAuth } from "@/contexts/authContext";
import { IAnnoucementInterface } from "@/interfaces/annoucement";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { userLoged } = useAuth();

  const { userWithAnnoucements, getAnnouncementsForProfile } =
    useAnnouncement();
  console.log(userWithAnnoucements);
  useEffect(() => {
    if (!userWithAnnoucements && id) {
      getAnnouncementsForProfile(id as string);
    }
  }, [userWithAnnoucements, id]);

  const goForLogin = () => {
    if (!userLoged) {
      router.push("/login");
    }
  };

  return (
    <>
      <Header></Header>
      <Box bgColor={"grey.8"} h={"1700px"} zIndex={1}>
        <Box w={"100%"} h={"257px"} bgColor={"brand.1"} zIndex={-1} />
        <Flex
          position={"absolute"}
          top={"180px"}
          w={"100%"}
          alignItems={"center"}
          direction={"column"}
        >
          <Box
            w={"80%"}
            bgColor={"grey.10"}
            padding={"30px"}
            gap={"15px"}
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"4px"}
          >
            <AvatarIcon size="xl" />
            <Flex gap={"10px"} alignItems={"center"}>
              <Heading fontSize={"sm"}>{userWithAnnoucements?.name}</Heading>
              <Text
                padding={"5px"}
                bgColor={"brand.4"}
                borderRadius={"4px"}
                color={"brand.1"}
              >
                {userWithAnnoucements?.is_seller ? "Anunciante" : ""}
              </Text>
            </Flex>
            <Text textAlign={"start"} color={"grey.3"}>
              {userWithAnnoucements?.description}
            </Text>
          </Box>
          <Heading
            mt={"25px"}
            mb={"30px"}
            w={"90%"}
            textAlign={"start"}
            fontSize={"lg"}
          >
            Anúncios
          </Heading>
          <SimpleGrid columns={4} spacing={30} mt={"20px"} w={"90%"}>
            {userWithAnnoucements &&
            userWithAnnoucements!.annoucements.length > 0 ? (
              userWithAnnoucements!.annoucements.map(
                (data: IAnnoucementInterface) => (
                  <AnnouceCard {...data} key={data.id} />
                )
              )
            ) : (
              <Text>Este usuario ainda nao possui anuncios</Text>
            )}
          </SimpleGrid>
        </Flex>
      </Box>
      <Footer></Footer>
    </>
  );
};

export default Profile;
