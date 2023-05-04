import { IAnnoucementInterface } from "@/interfaces/annoucement";
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

const AnnouceCard = (data: IAnnoucementInterface) => {
  const { setannouncementView, userView, getAnnouncementsForProfile } =
    useAnnouncement();

  const viewAnnouncementDetails = (data: IAnnoucementInterface) => {
    getAnnouncementsForProfile();
    setannouncementView(data);
    router.push(`/details/${data.id}`);
  };

  // const viewAnnouncementDetails2 = (data: IAnnoucementInterface) => {
  //   setannouncementView(data);
  //   router.push("/details");
  // };

  let {
    id,
    brand,
    model,
    fabrication_year,
    km,
    color,
    fuel_type,
    price,
    fipe,
    description,
    cover_img,
    created_at,
    updated_at,
    is_active,
    is_good_price,
    user,
  } = data;

  const router = useRouter();
  const pathname = router.pathname;

  price = +price;

  return (
    <>
      {pathname == "/" ? (
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
                left={"30px"}
                top={"30px"}
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
                <AvatarIcon name={user.name} />
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

            {pathname.includes("advertiser") ? (
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
      ) : (
        <Card
          as={"li"}
          w={{ base: "100%", lg: "100%" }}
          h={"356px"}
          marginBottom={"85px"}
          bgColor={"transparent"}
          border={"none"}
          boxShadow={"none"}
          minWidth={"none"}
          marginRight={{ base: "61px", lg: "0px" }}
          cursor={"pointer"}
          onClick={() => viewAnnouncementDetails(data)}
        >
          <Image
            src={cover_img}
            alt={"Imagem de capa do anúncio"}
            w={{ lg: "100%" }}
            h={{ lg: "250px" }}
            maxH={"220px"}
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
                <AvatarIcon name={userView?.name} />
                <Text fontSize={"xxs"} fontWeight={"medium"} color={"grey.2"}>
                  {userView?.name}
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

            {pathname == "/advertiser" && (
              <Flex>
                <Button variant={"outline1"} marginRight={"20px"}>
                  Edite
                </Button>
                <Button variant={"outline1"}>Ver detalhes</Button>
              </Flex>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default AnnouceCard;
