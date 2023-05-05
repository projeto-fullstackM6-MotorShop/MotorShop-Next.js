import AvatarIcon from "@/components/avatarIcon";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useAuth } from "@/contexts/authContext";
import { useComment } from "@/contexts/commentContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { ICreateCommentData } from "@/interfaces/comments";
import { useModal } from "@/contexts/modalContext";
import ModalAnnouncementPhotoDetail from "@/components/modalAnnouncementPhotoDetail";
import { DeleteIcon, TimeIcon } from "@chakra-ui/icons";

const makeACommentSchema = yup.object().shape({
  comment: yup.string().required().max(280),
});

const Details = () => {
  const [textAreaLength, setTextAreaLength] = useState(0);
  const [value, setValue] = useState("");

  const { userLoged } = useAuth();

  const { announcementView, allAnnouncements, setannouncementView } =
    useAnnouncement();

  const {
    commentsOfAnnoucement,
    getAllCommentsOfAnnoucement,
    createComment,
    deleteComment,
  } = useComment();

  const { onOpen, setDetailImageModal, setModalType, modalType } = useModal();

  const router = useRouter();

  const { annoucementId } = router.query;

  const { register, handleSubmit } = useForm<ICreateCommentData>({
    resolver: yupResolver(makeACommentSchema),
  });

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
    if (!userLoged) {
      router.push("/login");
    }
  };

  const makeAComment = (data: ICreateCommentData) => {
    setValue("");
    createComment(data, annoucementId as string);
  };

  const setImageAndOpenImageDetailModal = (imageUrl: string) => {
    setModalType("biggerPhoto");
    setDetailImageModal(imageUrl);
    onOpen();
  };

  const removeComment = (commentId: string) => {
    deleteComment(commentId, annoucementId as string);
  };

  const verifyTimeOfComment = (createdAt: string) => {
    const atualDate = new Date().getTime();
    const createdDate = new Date(createdAt).getTime();

    const seconds = Math.floor(atualDate / 1000);
    const oldSeconds = Math.floor(createdDate / 1000);

    const diference = seconds - oldSeconds;

    let output = "";

    if (diference < 60) {
      output = `${diference} segundos atrás`;
    } else if (diference < 3600) {
      output = `${Math.floor(diference / 60)} minutos atrás`;
    } else if (diference < 86400) {
      output = `${Math.floor(diference / 3600)} horas atrás`;
    } else if (diference < 2620800) {
      output = `${Math.floor(diference / 86400)} dias atrás`;
    } else if (diference < 31449600) {
      output = `${Math.floor(diference / 2620800)} meses atrás`;
    } else {
      output = `${Math.floor(diference / 31449600)} anos atrás`;
    }

    return output;
  };

  return (
    <>
      <Header />

      {modalType == "biggerPhoto" && <ModalAnnouncementPhotoDetail />}

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
                  onClick={() =>
                    announcementView?.cover_img &&
                    setImageAndOpenImageDetailModal(announcementView?.cover_img)
                  }
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
                  variant={userLoged ? "brand1" : "brandOpacity"}
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
                            onClick={() =>
                              image?.imageUrl &&
                              setImageAndOpenImageDetailModal(image?.imageUrl)
                            }
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
                  onClick={() =>
                    router.push(
                      `/announces/profile/${announcementView?.user.id}`
                    )
                  }
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
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Flex gap={"10px"} mb={"15px"} align={"center"}>
                        <AvatarIcon size="sm" name={comment.user.name} />
                        <Text variant={"body_2_500"} color={"grey.1"}>
                          {comment.user.name}
                        </Text>
                        <TimeIcon fontSize={"xxs"} />
                        <Text
                          variant={"body_1_400"}
                          color={"grey.3"}
                        >{`há ${verifyTimeOfComment(comment.createdAt)}`}</Text>
                      </Flex>
                      {userLoged?.id == comment.user.id && (
                        <DeleteIcon
                          fontSize={"xxs"}
                          color={"alert.1"}
                          onClick={() => removeComment(comment.id)}
                        />
                      )}
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
                <AvatarIcon size="sm" name={userLoged ? userLoged.name : ""} />
                <Text variant={"body_2_500"} color={"grey.1"}>
                  {userLoged?.name || "Nome de usuário"}
                </Text>
              </Flex>
              <Center
                as={"form"}
                w={"100%"}
                h={"75%"}
                onSubmit={handleSubmit(makeAComment)}
              >
                <Textarea
                  placeholder="Digite seu comentario"
                  size={"xs"}
                  w={"100%"}
                  h={"80%"}
                  resize={"none"}
                  value={value}
                  {...register("comment")}
                  onChange={(evt) => {
                    setTextAreaLength(evt.target.value.length);
                    setValue(evt.target.value);
                  }}
                />
                <Button
                  position={"absolute"}
                  right={"50px"}
                  bottom={"50px"}
                  variant={userLoged ? "brand1" : "disable"}
                  size={"sm"}
                  fontSize={"xxs"}
                  padding={"4px 15px"}
                  type={userLoged ? "submit" : "button"}
                  zIndex={2}
                  onClick={goForLogin}
                >
                  Comentar
                </Button>
                <Text
                  fontSize={"xxs"}
                  color={textAreaLength < 280 ? "grey.3" : "alert.1"}
                  position={"absolute"}
                  right={"50px"}
                  bottom={"8px"}
                >
                  {textAreaLength < 280
                    ? `Total de caracteres: ${textAreaLength}`
                    : `Você estourou o limite de caracteres, no máximo 280. Atualmente ${textAreaLength}.`}
                </Text>
              </Center>
            </Box>
          </Flex>
        </Box>
      </Box>

      {}

      <Footer />
    </>
  );
};
export default Details;
