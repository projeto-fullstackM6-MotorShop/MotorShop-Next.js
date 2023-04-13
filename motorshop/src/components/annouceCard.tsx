import { ICardPropInterface } from "@/interfaces/annouce";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const AnnouceCard = (data: ICardPropInterface) => {
  const {
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
  } = data.data;

  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Card as={"li"} width={"352px"} height={"152px"}>
      <CardBody display={"flex"} flexDirection={"column"} gap={"16px"}>
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
        <Image
          src={cover_img}
          alt={"Imagem de capa do anúncio"}
          boxSize={"100%"}
          objectFit={"cover"}
        />
        <Heading fontSize={"xs"} fontWeight={"semibold"} color={"grey.1"}>
          {`${brand} - ${model}`}
        </Heading>
        <Text
          fontSize={"xxs"}
          fontWeight={"normal"}
          lineHeight={"24px"}
          color={"grey.2"}
        >
          {description}
        </Text>
        <Flex alignItems={"center"} gap={"8px"}>
          <Box
            bg={"random.1"}
            width={"32px"}
            height={"32px"}
            borderRadius={"50%"}
          ></Box>
          <Text fontSize={"xxs"} fontWeight={"medium"} color={"grey.2"}>
            {"Nome do Usuário"}
          </Text>
        </Flex>
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
            {`R$ ${price.toFixed(2).toString().replace(".", ",")}`}
          </Heading>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default AnnouceCard;