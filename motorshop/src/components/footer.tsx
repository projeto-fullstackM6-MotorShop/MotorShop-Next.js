import { Box, Container, Image, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Box
        as={"footer"}
        w={"100%"}
        h={{ md: "140px", base: "310.34px" }}
        bgColor={"grey.0"}
        padding={"45px 59px"}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Image src="/motorsShopFooter.svg" alt="logo" />

        <Text color={"grey.11"}>
          &copy; {new Date().getFullYear()} - Todos os direitos reservados.
        </Text>

        <Box
          w={"53px"}
          h={"50px"}
          bgColor={"grey.1"}
          borderRadius={"4px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src="/angleUp.svg" alt="arrowUp" />
        </Box>
      </Box>
    </>
  );
};

export default Footer;
