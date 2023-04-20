import { IChildren } from "@/interfaces/misc";
import { IAnnouceInterface } from "@/interfaces/annouce";

import api from "@/services/api";
import { createContext, useEffect, useState } from "react";

interface AdvertiserProviderData {
  announcementRepository: IAnnouceInterface[];
}

const AdvertiserContext = createContext<AdvertiserProviderData>(
  {} as AdvertiserProviderData
);

export const AdvertiserProvider = ({ children }: IChildren) => {
  const [announcementRepository, setAnnouncementRepository] = useState<
    IAnnouceInterface[]
  >([]);

  useEffect(() => {
    adsFromAnAdvertiser();
  }, []);

  const adsFromAnAdvertiser = async () => {
    await api
      .get("/announcement")
      .then((res) => {
        setAnnouncementRepository(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AdvertiserContext.Provider
      value={{
        announcementRepository,
      }}
    >
      {children}
    </AdvertiserContext.Provider>
  );
};
