import AvatarIcon from "@/components/avatarIcon";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useAuth } from "@/contexts/authContext";
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
import { useRouter } from "next/router";
import { useEffect } from "react";

const Details = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { announcementView, goForprofile } = useAnnouncement()

  useEffect(() => {

  }, [announcementView])


  const goForLogin = () => {
    if (!user) {
      router.push("/login");
    }
  }; 

  return (
    <>
      <Header />
      <Box bgColor={"grey.8"} h={"1700px"} zIndex={1}>
        <Box w={"100%"} h={"550px"} bgColor={"brand.1"} zIndex={-1} />
        <Flex
          position={"absolute"}
          top={"120px"}
          w={"80%"}
          ml={"10%"}
          mr={"10%"}
          direction={"column"}
        >
          <SimpleGrid columns={2} spacing={15}>
            <Box>
              <Flex
                bgColor={"grey.11"}
                maxW={"500px"}
                justify={"center"}
                borderRadius={"4px"}
              >
                <Img src="/frontSidePilotNear.png"></Img>
              </Flex>

              <Flex
                bgColor={"grey.11"}
                h={"239px"}
                mb={"10px"}
                mt={"10px"}
                direction={"column"}
                borderRadius={"4px"}
                align={"center"}
                position={"relative"}
                padding={"20px"}
              >
                <Heading color={"grey.0"} fontSize={"xs"} mt={"30px"}>
                  {announcementView?.model}
                </Heading>
                <Flex
                  justifyContent={"space-between"}
                  w={"100%"}
                  mt={"50px"}
                  mb={"10px"}
                >
                  <Flex w={"100px"} justify={"space-between"} h={"30px"}>
                    <Text
                      padding={"5px"}
                      bgColor={"brand.4"}
                      borderRadius={"4px"}
                      color={"brand.1"}
                    >
                      {announcementView?.fabrication_year}
                    </Text>
                    <Text
                      padding={"5px"}
                      bgColor={"brand.4"}
                      borderRadius={"4px"}
                      color={"brand.1"}
                    >
                      {`${announcementView?.km}Km`}
                    </Text>
                  </Flex>
                  <Text>{`R$ ${announcementView?.price}`}</Text>
                </Flex>
                <Button
                  variant={user ? "brand1" : "brandOpacity"}
                  position={"absolute"}
                  bottom={"10px"}
                  left={"20px"}
                  onClick={goForLogin}
                >
                  Comprar
                </Button>
              </Flex>

              <Flex
                bgColor={"grey.11"}
                direction={"column"}
                padding={"30px"}
                gap={"15px"}
                borderRadius={"4px"}
              >
                <Heading w={"80%"} fontSize={"md"}>
                  Descrição
                </Heading>
                <Text w={"80%"}>
                  {announcementView?.description}
                </Text>
              </Flex>
            </Box>

            <Flex direction={"column"} gap={"10px"}>
              <Flex
                direction={"column"}
                bgColor={"grey.11"}
                borderRadius={"4px"}
                padding={"30px"}
              >
                <Heading mb={"10px"}>Fotos</Heading>
                <SimpleGrid columns={3} spacing={3}>
                  <Box
                    w={"108px"}
                    h={"108px"}
                    display={"flex"}
                    cursor={"pointer"}
                  >
                    <Img
                      src="/frontSidePilotNear.png"
                      maxW={"110px"}
                      bgColor={"grey.6"}
                      borderRadius={"4px"}
                      objectFit={"scale-down"}
                    />
                  </Box>

                </SimpleGrid>
              </Flex>

              <Flex
                align={"center"}
                direction={"column"}
                bgColor={"grey.11"}
                padding={"20px"}
                gap={"20px"}
                borderRadius={"4px"}
              >
                <AvatarIcon size="xl" />
                <Heading fontSize={"sm"}>{announcementView?.user.name}</Heading>
                <Text textAlign={"center"} color={"grey.3"}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industries
                </Text>
                <Button variant={"grey1"} onClick={ goForprofile }> ver anuncios</Button>
              </Flex>
            </Flex>
          </SimpleGrid>
          <Box
            bgColor={"grey.11"}
            borderRadius={"4px"}
            padding={"15px"}
            gap={"20px"}
            overflowY={"auto"}
            h={"500px"}
            mt={"20px"}
            maxW={"50%"}
          >
            <Heading fontSize={"md"} mb={"20px"}>
              Comentarios
            </Heading>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
            <Box padding={"5px"} mb={"15px"}>
              <Flex gap={"10px"} mb={"15px"} align={"center"}>
                <AvatarIcon size="sm" />
                <Heading fontSize={"sm"}>Nome usuario</Heading>
              </Flex>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industries standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </Box>
          </Box>

          <Box
            position={"relative"}
            mt={"20px"}
            padding={"15px"}
            w={"50%"}
            h={"230px"}
            bgColor={"grey.11"}
            borderRadius={"4px"}
          >
            <Flex gap={"10px"} mb={"15px"} align={"center"}>
              <AvatarIcon size="sm" />
              <Heading fontSize={"sm"}>{user?.name}</Heading>
            </Flex>
            <Center w={"100%"} h={"75%"}>
              <Textarea
                placeholder="Digite seu comentario"
                size={"xs"}
                w={"90%"}
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
      <Footer />
    </>
  );
};
export default Details;
