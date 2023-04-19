import { FormLabel, Input } from "@chakra-ui/react";

const AnnouncementImage = ({ imgNumber }: any) => {
  return (
    <>
      <FormLabel
        fontSize={"xs"}
        fontWeight={"bold"}
        htmlFor={`image{imgNumber}`}
      >
        {imgNumber}º Imagem da galeria
      </FormLabel>
      <Input marginBottom={"30px"} placeholder="https://image.com" />
    </>
  );
};

export default AnnouncementImage;
