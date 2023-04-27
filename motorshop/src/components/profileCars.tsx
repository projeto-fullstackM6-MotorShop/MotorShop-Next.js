import { Flex, SimpleGrid } from "@chakra-ui/react";
import AnnouceCard from "./annouceCard";
import { useAnnouncement } from "@/contexts/announcementContext";
import { useEffect } from "react";

const ProfileCars = () => {
  const { announcementProfileView } = useAnnouncement();

  useEffect(() => {
   
  }, [announcementProfileView])

  return (
    <SimpleGrid columns={4} spacing={30} mt={'20px'} w={'90%'}>
      {announcementProfileView.map((announcement) => {
        return <AnnouceCard key={announcement.id} {...announcement} />;
      })}
    </SimpleGrid>
  );
};

export default ProfileCars;
