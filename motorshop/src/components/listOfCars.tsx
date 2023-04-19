import { mockAnnouce } from "@/mocks/AnnouceMock";
import { Flex } from "@chakra-ui/react";
import AnnouceCard from "./annouceCard";

const ListOfCars = () => {
  return (
    <Flex
      w={"95%"}
      margin={"auto"}
      marginLeft={{ base: "15px", lg: "auto" }}
      flexWrap={{ base: "nowrap", lg: "wrap" }}
      justifyContent={"space-between"}
      overflow={{ base: "auto" }}
    >
      {mockAnnouce.map((annouce) => {
        return <AnnouceCard key={annouce.id} data={annouce} />;
      })}
    </Flex>
  );
};

export default ListOfCars;
