import { SimpleGrid } from "@chakra-ui/react";
import AnnouceCard from "./annoucementCard";
import { useAnnouncement } from "@/contexts/announcementContext";

const ListOfCars = () => {
  const { allAnnouncements } = useAnnouncement();

  return (
    <SimpleGrid columns={4} spacing={30} mt={"20px"} w={"90%"}>
      {allAnnouncements.map((announcement) => {
        return <AnnouceCard key={announcement.id} {...announcement} />;
      })}
    </SimpleGrid>
  );
};

export default ListOfCars;
