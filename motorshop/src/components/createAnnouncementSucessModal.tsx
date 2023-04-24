import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import GeneralModal from "./generalModal";
import { useModal } from "@/contexts/modalContext";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useEffect } from "react";

const CreateAnnouncementSucessModal = () => {
  const { onClose, isOpen } = useModal();
  const { setIsCreateAnnouncementSucessOpen } = useAnnouncement();

  const closeSucessModal = () => {
    setIsCreateAnnouncementSucessOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsCreateAnnouncementSucessOpen(false);
    }
  }, [isOpen]);
  return (
    <>
      <GeneralModal>
        <Box padding={"15px"}>
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Sucesso!</Text>
            <Button onClick={closeSucessModal} color={"grey.4"} fontSize={"xs"}>
              X
            </Button>
          </Flex>
          <Box>
            <Heading fontWeight={"bold"} fontSize={"xs"} marginBottom={"25px"}>
              Seu anúncio foi criado com sucesso!
            </Heading>
            <Text marginBottom={"30px"}>
              Agora você poderá ver seus negócios crescendo em grande escala
            </Text>
          </Box>
        </Box>
      </GeneralModal>
    </>
  );
};

export default CreateAnnouncementSucessModal;
