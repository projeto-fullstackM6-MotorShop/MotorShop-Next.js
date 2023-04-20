import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import AvatarIcon from "./avatarIcon";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Usuario para teste de modal com usuario "user = true" e sem usuario "user = false"
  let user = true;
  const userName = "Clayson Roberto";

  return (
    <>
      <Box
        backgroundColor={"grey.10"}
        borderBottom={"2px solid"}
        borderColor={"grey.6"}
        h={"80px"}
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={{ base: "0px 15px", md: "0px 60px" }}
        zIndex={1}
      >
        <Image src="/motorsShop.svg" alt="logo" />

        <Flex>
          <IconButton
            backgroundColor={"grey.10"}
            h={"46px"}
            w={"46px"}
            icon={isOpen ? <CloseIcon h={"15px"} /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            _hover={{
              h: "46px",
              w: "46px",
            }}
          />
        </Flex>

        {user ? (
          <HStack h={"100%"} display={{ base: "none", md: "flex" }}>
            <Flex
              borderLeft={"2px solid"}
              borderColor={"grey.6"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              w={"311px"}
              h={"100%"}
            >
              <Wrap>
                <WrapItem alignItems={"center"} marginRight={"124px"}>
                  <AvatarIcon />
                  <Text
                    marginLeft={"8px"}
                    marginRight={"120px"}
                    fontSize={"xs"}
                    fontWeight={"normal"}
                    color={"grey.2"}
                  >
                    {userName}
                  </Text>
                </WrapItem>
              </Wrap>
            </Flex>
          </HStack>
        ) : (
          <HStack h={"100%"} display={{ base: "none", md: "flex" }}>
            <Flex
              borderLeft={"2px solid"}
              borderColor={"grey.6"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              w={"311px"}
              h={"100%"}
            >
              <Link as={NextLink} href="">
                Fazer login
              </Link>
              <Button variant={"outline2"} marginLeft={"44px"}>
                Cadastrar
              </Button>
            </Flex>
          </HStack>
        )}

        {isOpen ? (
          <Box
            display={{ base: "flex", md: "none" }}
            position={"fixed"}
            backgroundColor={"grey.10"}
            border={"2px solid"}
            borderColor={"grey.6"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            maxHeight={"100%"}
            w={"323px"}
            top={"78px"}
            left={"-1px"}
            zIndex={3000}
          >
            <Stack
              h={"236px"}
              as={"nav"}
              color={"grey.2"}
              justifyContent={"space-evenly"}
              paddingLeft={"16px"}
            >
              <Link variant={"textBody1"} as={NextLink} href="">
                Carros
              </Link>
              <Link variant={"textBody1"} as={NextLink} href="">
                Motos
              </Link>
              <Link variant={"textBody1"} as={NextLink} href="">
                Leilão
              </Link>
            </Stack>
            {user ? (
              <></>
            ) : (
              <Container
                h={"184px"}
                display={"flex"}
                flexDirection={"column"}
                borderTop={"2px solid"}
                borderColor={"grey.6"}
                justifyContent={"space-evenly"}
              >
                <Link variant={"textBody1"} as={NextLink} href="">
                  Fazer login
                </Link>
                <Button variant={"outline2"}>Cadastrar</Button>
              </Container>
            )}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
