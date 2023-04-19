import { Box, Button, Heading, Text } from "@chakra-ui/react";
import GeneralModal from "./generalModal";
import { useModal } from "@/contexts/modalContext";

const createAnnouncementSucessModal = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { onClose } = useModal();
  return (
    <GeneralModal>
      <Box>
        <Text>Sucesso!</Text>
        <Button onClick={onClose}>X</Button>
      </Box>
      <Box>
        <Heading>Seu anúncio foi criado com sucesso!</Heading>
        <Text>
          Agora você poderá ver seus negócios crescendo em grande escala
        </Text>
      </Box>
    </GeneralModal>
  );
};

export default createAnnouncementSucessModal;
