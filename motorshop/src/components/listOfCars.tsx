import { Flex } from "@chakra-ui/react";
import AnnouceCard from "./annouceCard";
import { useAnnouncement } from "@/contexts/announcementContext";

const ListOfCars = () => {
  const { allAnnouncements } = useAnnouncement();

  return (
    <Flex
      w={"95%"}
      margin={"auto"}
      marginLeft={{ base: "15px", lg: "auto" }}
      flexWrap={{ base: "nowrap", lg: "wrap" }}
      justifyContent={"space-between"}
      overflow={{ base: "auto" }}
    >
      {allAnnouncements.map((announcement) => {
        return <AnnouceCard key={announcement.id} data={announcement} />;
      })}
    </Flex>
  );
};

export default ListOfCars;
