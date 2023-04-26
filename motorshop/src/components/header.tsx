import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import AvatarIcon from "./avatarIcon";
import { destroyCookie } from "nookies";

const Header = () => {
  const { user } = useAuth();

  const router = useRouter();

  const onLogout = () => {
    destroyCookie(null, "@motorshop:token");

    router.reload();
  };

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
        <Image
          src="/motorsShop.svg"
          alt="logo"
          onClick={() => router.push("/")}
          cursor={"pointer"}
        />

        {user ? (
          <Menu>
            <MenuButton
              as={Button}
              bg={"transparent"}
              borderLeft={"2px solid"}
              borderRadius={"0"}
              borderColor={"grey.6"}
              h={"100%"}
              paddingLeft={"2rem"}
              _hover={{ bg: "trasparent" }}
              _active={{ bg: "trasparent" }}
            >
              <Flex
                alignItems={"center"}
                justifyContent={"flex-end"}
                gap={"0.5rem"}
              >
                <AvatarIcon userName={user.name} />
                <Text fontSize={"xs"} color={"grey.2"}>
                  {user.name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>Editar Perfil</MenuItem>
              <MenuItem>Editar Endereço</MenuItem>
              {user.is_seller && <MenuItem>Meus Anúncios</MenuItem>}
              <MenuItem onClick={onLogout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <HStack h={"100%"} display={{ base: "none", md: "flex" }}>
            <Flex
              borderLeft={"2px solid"}
              borderColor={"grey.6"}
              justifyContent={"space-around"}
              alignItems={"center"}
              w={"311px"}
              h={"100%"}
            >
              <Button variant={"light"} onClick={() => router.push("/login")}>
                Fazer login
              </Button>
              <Button
                variant={"outline2"}
                onClick={() => router.push("/register")}
              >
                Cadastrar
              </Button>
            </Flex>
          </HStack>
        )}
      </Box>
    </>
  );
};

export default Header;
