import { Flex, SimpleGrid } from "@chakra-ui/react";
import AnnouceCard from "./annouceCard";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useEffect } from "react";

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
