import { mockAnnouce } from "@/mocks/AnnouceMock";
import { Box, SimpleGrid } from "@chakra-ui/react";
import AnnouceCard from "./annouceCard";

const ListOfCars = () => {
  return (
    <SimpleGrid columns={3} spacing={10}>
      {mockAnnouce.map((annouce) => {
        return <AnnouceCard key={annouce.id} data={annouce} />;
      })}
    </SimpleGrid>
  );
};

export default ListOfCars;
