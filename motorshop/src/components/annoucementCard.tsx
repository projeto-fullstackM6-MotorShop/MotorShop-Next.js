import { useAuth } from "@/contexts/authContext";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useModal } from "@/contexts/modalContext";
import { IAnnoucementInterface } from "@/interfaces/annoucement";
import AvatarIcon from "./avatarIcon";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import EditOrDeleteAnnouncementModal from "./editOrDeleteAnnouncementModal";

const AnnouceCard = (data: IAnnoucementInterface) => {
  const { userLoged } = useAuth();

  const {
    setisEditOrDeleteAnnouncementOpen,
    getAnnouncementById,
    announcementView,
  } = useAnnouncement();

  const { onOpen, setModalType, modalType } = useModal();

  const router = useRouter();
  const pathname = router.pathname;

  let {
    id,
    cover_img,
    brand,
    model,
    description,
    km,
    fabrication_year,
    price,
    is_good_price,
    is_active,
  } = data;

  useEffect(() => {
    getAnnouncementById(id);
  }, []);

  const viewAnnouncementDetails = () => {
    if (pathname == "/") {
      if (userLoged?.id == announcementView?.user?.id) {
        router.push(`/announces/advertiser/${userLoged!.id}`);
      } else {
        router.push(`/details/${id}`);
      }
    }
  };

  const advertiserToDetails = () => {
    router.push(`/details/${id}`);
  };

  const openEditOrDeleteAnnouncementModal = useCallback(async () => {
    setisEditOrDeleteAnnouncementOpen(true);
    getAnnouncementById(id);
    setModalType("editOrDelAnnounce");
    onOpen();
  }, []);

  return (
    <>
      <Card
        as={"li"}
        minWidth={"287px"}
        maxWidth={"287px"}
        h={"356px"}
        marginBottom={"85px"}
        bgColor={"transparent"}
        border={"none"}
        boxShadow={"none"}
        marginRight={{ base: "80px", lg: "0px" }}
        cursor={"pointer"}
        onClick={() => viewAnnouncementDetails()}
      >
        <Image
          src={cover_img}
          alt={"Imagem de capa do anúncio"}
          w={{ lg: "100%" }}
          h={{ lg: "152px" }}
          marginBottom={"16px"}
          objectFit={"cover"}
          maxW={"none"}
        />
        <CardBody
          display={"flex"}
          flexDirection={"column"}
          gap={"16px"}
          padding={"0px"}
          justifyContent={"space-between"}
        >
          {pathname == "/" && is_good_price && (
            <Text
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.11"}
              bg={"random.7"}
              width={"fit-content"}
              borderRadius={"3px"}
              padding={"4px"}
              position={"absolute"}
              right={"0"}
              top={"0"}
            >
              $
            </Text>
          )}

          {pathname.includes("profile") && (
            <Text
              fontSize={"xxs"}
              fontWeight={"medium"}
              color={"grey.11"}
              bg={is_active ? "brand.1" : "grey.4"}
              width={"fit-content"}
              borderRadius={"3px"}
              padding={"2px 4px"}
              position={"absolute"}
              left={"10px"}
              top={"10px"}
            >
              {is_active ? "Ativo" : "Inativo"}
            </Text>
          )}

          <Heading fontSize={"xs"} fontWeight={"semibold"} color={"grey.1"}>
            {`${brand} - ${model}`}
          </Heading>
          <Text
            textStyle={"body_1_400"}
            whiteSpace={"nowrap"}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {description}
          </Text>

          {pathname.includes("advertiser") ? (
            <></>
          ) : (
            <Flex alignItems={"center"} gap={"8px"}>
              <AvatarIcon name={announcementView?.user?.name} />
              <Text fontSize={"xxs"} fontWeight={"medium"} color={"grey.2"}>
                {announcementView?.user?.name}
              </Text>
            </Flex>
          )}

          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={"12px"}>
              <Text
                fontSize={"xxs"}
                fontWeight={"medium"}
                color={"brand.1"}
                bg={"brand.4"}
                padding={"4px 8px"}
              >
                {`${km.length > 3 ? km.slice(0, 3) : km} KM`}
              </Text>
              <Text
                fontSize={"xxs"}
                fontWeight={"medium"}
                color={"brand.1"}
                bg={"brand.4"}
                padding={"4px 8px"}
              >
                {fabrication_year}
              </Text>
            </Flex>
            <Heading fontSize={"xs"} fontWeight={"bold"} color={"grey.1"}>
              {parseFloat(price as string).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Heading>
          </Flex>

          {pathname.includes("advertiser") && (
            <Flex>
              <Button
                variant={"outline1"}
                marginRight={"20px"}
                onClick={() => openEditOrDeleteAnnouncementModal()}
              >
                Editar
              </Button>
              <Button
                variant={"outline1"}
                onClick={() => advertiserToDetails()}
              >
                Ver detalhes
              </Button>
            </Flex>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default AnnouceCard;
