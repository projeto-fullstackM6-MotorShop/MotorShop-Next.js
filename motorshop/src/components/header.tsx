import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import AvatarIcon from "./avatarIcon";
import { destroyCookie } from "nookies";
import { useModal } from "@/contexts/modalContext";
import EditUserModal from "./createEditUserModal";
import EditAddressModal from "./createEditAddressModal";
import { useMediaQuery } from "react-responsive";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useFilter } from "@/contexts/filterContext";
import { useAnnouncement } from "@/contexts/announcementContext";

const Header = () => {
  const { userLoged } = useAuth();

  const { onOpen, modalType, setModalType } = useModal();

  const { setIsFilterOpen } = useFilter();

  const { getAnnouncementsForProfile } = useAnnouncement();

  const router = useRouter();

  const toMyAnnounces = () => {
    getAnnouncementsForProfile(userLoged!.id);
    router.push(`/announces/advertiser/${userLoged!.id}`);
  };

  const onLogout = () => {
    destroyCookie(null, "@motorshop:token");

    router.reload();
  };

  const openEditUserModal = () => {
    setModalType("editUser");

    onOpen();
  };

  const openEditAddressModal = () => {
    setModalType("editAddress");

    onOpen();
  };

  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 1048 });
  const pathname = router.pathname;

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

        {userLoged && isSmallScreen ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              border={"none"}
            >
              <Flex
                alignItems={"center"}
                justifyContent={"flex-end"}
                gap={"0.5rem"}
              >
                <AvatarIcon name={userLoged.name} />
                <Text fontSize={"xs"} color={"grey.2"}>
                  {userLoged.name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList zIndex={"2000"}>
              <MenuItem onClick={openEditUserModal}>Editar Perfil</MenuItem>
              <MenuItem onClick={openEditAddressModal}>
                Editar Endereço
              </MenuItem>
              {userLoged.is_seller && (
                <MenuItem onClick={() => toMyAnnounces()}>
                  Meus Anúncios
                </MenuItem>
              )}
              {pathname == "/" && (
                <MenuItem onClick={() => setIsFilterOpen(true)}>
                  Filtros
                </MenuItem>
              )}
              <MenuItem onClick={onLogout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          userLoged && (
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
                  <AvatarIcon name={userLoged.name} />
                  <Text fontSize={"xs"} color={"grey.2"}>
                    {userLoged.name}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList zIndex={"2000"}>
                <MenuItem onClick={openEditUserModal}>Editar Perfil</MenuItem>
                <MenuItem onClick={openEditAddressModal}>
                  Editar Endereço
                </MenuItem>
                {userLoged.is_seller && (
                  <MenuItem onClick={() => toMyAnnounces()}>
                    Meus Anúncios
                  </MenuItem>
                )}
                <MenuItem onClick={onLogout}>Sair</MenuItem>
              </MenuList>
            </Menu>
          )
        )}
        {!userLoged && isSmallScreen && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              border={"none"}
            ></MenuButton>
            <MenuList zIndex={"2000"}>
              <MenuItem>
                <Text variant={"light"} onClick={() => router.push("/login")}>
                  Fazer login
                </Text>
              </MenuItem>
              <MenuItem>
                <Text
                  variant={"outline2"}
                  onClick={() => router.push("/register")}
                >
                  Cadastrar
                </Text>
              </MenuItem>
              {pathname == "/" && (
                <MenuItem onClick={() => setIsFilterOpen(true)}>
                  Filtros
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
        {!userLoged && !isSmallScreen && (
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
        {modalType == "editUser" ? (
          <EditUserModal />
        ) : modalType == "editAddress" ? (
          <EditAddressModal />
        ) : null}
      </Box>
    </>
  );
};

export default Header;
