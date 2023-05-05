import { useModal } from "@/contexts/modalContext";
import GeneralModal from "./generalModal";
import { Box, Flex, Img, Text } from "@chakra-ui/react";

const ModalAnnouncementPhotoDetail = () => {
  const { detailImageModal, onClose } = useModal();
  return (
    <GeneralModal>
      <Box padding={"20px"}>
        <Flex
          justifyContent={"space-between"}
          marginBottom={"30px"}
          fontSize={"sm"}
        >
          <Text fontWeight={"bold"}>Imagem do veículo</Text>
          <Text color={"grey.5"} cursor={"pointer"} onClick={onClose}>
            X
          </Text>
        </Flex>
        <Img src={detailImageModal} objectFit={"cover"} width={"100%"}></Img>
      </Box>
    </GeneralModal>
  );
};

export default ModalAnnouncementPhotoDetail;
