import { IAnnouceInterface, ICardPropInterface } from "@/interfaces/annouce";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AvatarIcon from "./avatarIcon";
import { useAnnouncement } from "@/contexts/announcementContext";
import { IUserProfileData } from "@/interfaces/usersTypes";

const AnnouceProfileCard = (data: IUserProfileData) => {

  const { setannouncementView } = useAnnouncement()

  const viewAnnouncementDetails = (data: IUserProfileData) => {
    setannouncementView(data)
    router.push("/details");    
  }  

    let {
      id,

  } = data;    
  
  const router = useRouter();
  const pathname = router.pathname;

  price = +price;

  return (
    <Card
      as={"li"}
      w={{ base: "290px", lg: "312px" }}
      h={"356px"}
      marginBottom={"85px"}
      bgColor={"transparent"}
      border={"none"}
      boxShadow={"none"}
      minWidth={"none"}
      marginRight={{ base: "61px", lg: "0px" }}
      cursor={'pointer'}
      onClick={() => viewAnnouncementDetails(data)}
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
            right={"21px"}
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
            left={"30px"}
            top={"30px"}
          >
            {is_active ? "Ativo" : "Inativo"}
          </Text>
        )}

        <Heading fontSize={"xs"} fontWeight={"semibold"} color={"grey.1"}>
          {`${brand} - ${model}`}
        </Heading>
        <Text textStyle={"body_1_400"}>{description}</Text>

        {pathname == "/advertiser" ? (
          <></>
        ) : (
          <Flex alignItems={"center"} gap={"8px"}>
            <AvatarIcon />
            <Text fontSize={"xxs"} fontWeight={"medium"} color={"grey.2"}>
                {user.name}
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
            {/* {`R$ ${price.toFixed(2).toString().replace(".", ",")}`} */}
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Heading>
        </Flex>

        {pathname == "/advertiser" ? (
          <Flex>
            <Button variant={"outline1"} marginRight={"20px"}>
              Edite
            </Button>
            <Button variant={"outline1"}>Ver detalhes</Button>
          </Flex>
        ) : (
          <></>
        )}
      </CardBody>
    </Card>
  );
};

export default AnnouceProfileCard;
