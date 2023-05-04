import AvatarIcon from "@/components/avatarIcon";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useAuth } from "@/contexts/authContext";
import { useComment } from "@/contexts/commentContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";

const Details = () => {
  const { user } = useAuth();

  const { announcementView, allAnnouncements, setannouncementView } =
    useAnnouncement();

  const { commentsOfAnnoucement, getAllCommentsOfAnnoucement } = useComment();

  const router = useRouter();

  const { annoucementId } = router.query;

  useEffect(() => {
    if (annoucementId) {
      setannouncementView(
        allAnnouncements.find((annoucement) => annoucement.id == annoucementId)!
      );
    }
    if (announcementView) {
      getAllCommentsOfAnnoucement(announcementView!.id);
    }
  }, [annoucementId, announcementView]);

  const goForLogin = () => {
    if (!user) {
      router.push("/login");
    }
  };

  return (
    <>
      <Header />

      <Box bgColor={"grey.8"} h={"1800px"}>
        <Box w={"100%"} h={"550px"} bgColor={"brand.1"} zIndex={-1} />

        <Box position={"absolute"} top={"120px"} w={"100%"}>
          <Flex w={"80%"} m={"0 auto"} justifyContent={"space-between"}>
            <Box w={"58%"}>
              <Flex
                bgColor={"grey.11"}
                h={"355px"}
                justify={"center"}
                align={"center"}
                borderRadius={"4px"}
              >
                <Img
                  src={announcementView?.cover_img}
                  objectFit={"scale-down"}
                  h={"100%"}
                  w={"100%"}
                />
              </Flex>

              <Flex
                bgColor={"grey.11"}
                h={"250px"}
                mb={"20px"}
                mt={"20px"}
                padding={"20px"}
                borderRadius={"4px"}
                direction={"column"}
                justify={"space-around"}
              >
                <Heading
                  variant={"healding_6_600"}
                  color={"grey.1"}
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                >
                  {announcementView?.model}
                </Heading>
                <Flex justifyContent={"space-between"}>
                  <Flex w={"50%"} gap={"8px"}>
                    <Text
                      variant={"body_2_500"}
                      p={"5px"}
                      bg={"brand.4"}
                      color={"brand.1"}
                    >
                      {announcementView?.fabrication_year}
                    </Text>
                    <Text
                      variant={"body_2_500"}
                      p={"5px"}
                      bg={"brand.4"}
                      color={"brand.1"}
                    >
                      {`${announcementView?.km} KM`}
                    </Text>
                  </Flex>
                  <Text variant={"healding_7_500"} color={"grey.1"}>
                    {`${announcementView?.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}`}
                  </Text>
                </Flex>
                <Button
                  w={"fit-content"}
                  variant={user ? "brand1" : "brandOpacity"}
                  onClick={goForLogin}
                >
                  Comprar
                </Button>
              </Flex>

              <Flex
                bgColor={"grey.11"}
                h={"200px"}
                mb={"20px"}
                padding={"20px"}
                borderRadius={"4px"}
                direction={"column"}
                gap={"10px"}
              >
                <Heading variant={"healding_6_600"} color={"grey.1"}>
                  Descrição
                </Heading>
                <Text
                  variant={"body_1_400"}
                  color={"grey.2"}
                  overflowY={"auto"}
                >
                  {announcementView?.description}
                </Text>
              </Flex>
            </Box>

            <Flex direction={"column"} gap={"10px"} w={"38%"}>
              <Flex
                bgColor={"grey.11"}
                mb={"20px"}
                padding={"20px"}
                borderRadius={"4px"}
                direction={"column"}
              >
                <Heading
                  variant={"healding_6_600"}
                  color={"grey.1"}
                  mb={"10px"}
                >
                  Fotos
                </Heading>
                {announcementView?.image.length ? (
                  <SimpleGrid columns={3} spacing={3}>
                    {announcementView?.image.map((image) => {
                      return (
                        <Box
                          key={image.id}
                          w={"108px"}
                          h={"108px"}
                          cursor={"pointer"}
                        >
                          <Img
                            src={image.imageUrl}
                            borderRadius={"4px"}
                            w={"100%"}
                            h={"100%"}
                            objectFit={"cover"}
                          />
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                ) : (
                  <Text
                    variant={"body_1_400"}
                    color={"grey.2"}
                    textAlign={"center"}
                  >
                    Este anuncio não possui imagens de detalhes
                  </Text>
                )}
              </Flex>

              <Flex
                align={"center"}
                direction={"column"}
                bgColor={"grey.11"}
                padding={"20px"}
                gap={"20px"}
                borderRadius={"4px"}
              >
                <AvatarIcon size="xl" name={announcementView?.user.name} />
                <Heading variant={"healding_6_600"} color={"grey.1"}>
                  {announcementView?.user?.name}
                </Heading>
                <Text
                  textAlign={"center"}
                  variant={"body_1_400"}
                  color={"grey.2"}
                >
                  {announcementView?.user.description}
                </Text>
                <Button
                  variant={"grey1"}
                  onClick={() => router.push("/profile")}
                >
                  Ver todos anúncios
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex w={"80%"} m={"0 auto"} direction={"column"}>
            <Box
              bgColor={"grey.11"}
              borderRadius={"4px"}
              padding={"20px"}
              h={"600px"}
              w={"58%"}
              overflowY={"auto"}
            >
              <Heading variant={"healding_6_600"} color={"grey.1"} mb={"20px"}>
                Comentarios
              </Heading>

              {commentsOfAnnoucement.map((comment) => {
                return (
                  <Box padding={"5px"} key={comment.id}>
                    <Flex gap={"10px"} mb={"15px"} align={"center"}>
                      <AvatarIcon size="sm" name={comment.user.name} />
                      <Text variant={"body_2_500"} color={"grey.1"}>
                        {comment.user.name}
                      </Text>
                    </Flex>
                    <Text
                      variant={"body_2_400"}
                      color={"grey.2"}
                      textAlign={"justify"}
                    >
                      {comment.comment}
                    </Text>
                  </Box>
                );
              })}
            </Box>

            <Box
              mt={"20px"}
              padding={"20px"}
              w={"58%"}
              h={"230px"}
              bgColor={"grey.11"}
              borderRadius={"4px"}
              position={"relative"}
            >
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" name={user ? user.name : ""} />
                <Text variant={"body_2_500"} color={"grey.1"}>
                  {user?.name || "Nome de usuário"}
                </Text>
              </Flex>
              <Center w={"100%"} h={"75%"}>
                <Textarea
                  placeholder="Digite seu comentario"
                  size={"xs"}
                  w={"100%"}
                  h={"80%"}
                  resize={"none"}
                />
              </Center>
              <Button
                position={"absolute"}
                right={"50px"}
                bottom={"50px"}
                variant={user ? "brand1" : "disable"}
                size={"sm"}
                fontSize={"xxs"}
                padding={"4px 15px"}
                onClick={goForLogin}
              >
                Comentar
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Footer />
    </>
  );
};
export default Details;
