import { FormLabel, Input } from "@chakra-ui/react";

const AnnouncementImage = ({ imgNumber }: any) => {
  return (
    <>
      <FormLabel htmlFor={`image{imgNumber}`}>
        {imgNumber}º Imagem da galeria
      </FormLabel>
      <Input placeholder="https://image.com" />
    </>
  );
};

export default AnnouncementImage;
