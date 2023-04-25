import { Flex, SimpleGrid } from "@chakra-ui/react";
import AnnouceCard from "./annouceCard";
import { useAnnouncement } from "@/contexts/announcementContext";

const ListOfCars = () => {
  const { allAnnouncements } = useAnnouncement();

  return (
    <SimpleGrid columns={4} spacing={30} mt={'20px'} w={'90%'}>
      {allAnnouncements.map((announcement) => {
        return <AnnouceCard key={announcement.id} data={announcement} />;
      })}
    </SimpleGrid>
  );
};

export default ListOfCars;
