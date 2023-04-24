import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IChildren } from "@/interfaces/misc";
import { api, carsApi } from "@/services/api";
import { IAnnouceInterface, IAnnouncementRequest } from "../interfaces/annouce";

interface announcementProviderData {
  getAllCars: () => Promise<void>;
  allCars: IAnnouceInterface[];
  allBrands: string[];
  CreateAnnouncement: (data: IAnnouncementRequest) => Promise<void>;
  isCreateAnnouncementSucessOpen: boolean;
  isCreateAnnouncementOpen: boolean;
  setIsCreateAnnouncementOpen: Dispatch<SetStateAction<boolean>>;
  setIsCreateAnnouncementSucessOpen: Dispatch<SetStateAction<boolean>>;
  setAllBrands: Dispatch<SetStateAction<string[]>>;
}

export const AnnouncementContext = createContext<announcementProviderData>(
  {} as announcementProviderData
);

export const AnnouncementProvider = ({ children }: IChildren) => {
  const [allCars, setAllCars] = useState([] as IAnnouceInterface[]);
  const [allBrands, setAllBrands] = useState([] as string[]);
  const [userAnnouncements, setUserAnnouncements] = useState(
    [] as IAnnouceInterface[]
  );
  const [isCreateAnnouncementSucessOpen, setIsCreateAnnouncementSucessOpen] =
    useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] =
    useState(false);

  useEffect(() => {
    const brands = Object.keys(allCars);
    setAllBrands(brands);
  }, [allCars]);

  const getAllCars = async () => {
    try {
      const response = await carsApi.get<IAnnouceInterface[]>("/cars");
      setAllCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateAnnouncement = async (data: IAnnouncementRequest) => {
    api.defaults.headers.common.authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY3RvcmlhQGdtYWlsLmNvbSIsImlhdCI6MTY4MjM1MTU1OCwiZXhwIjoxNjgyNDM3OTU4LCJzdWIiOiI1OTYxMjY0ZC02MDI1LTQyODYtYjA2NC0yMmIxOGU4YzIwYzgifQ.2aL58g61poTqlJzfi4dYAGfBteF4EeONzV-Qqi1rnf8"}`;
    try {
      const response = await api.post("/announcement", data);
      setUserAnnouncements({ userAnnouncements, ...response.data });
      setIsCreateAnnouncementSucessOpen(true);
      setIsCreateAnnouncementOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <AnnouncementContext.Provider
      value={{
        getAllCars,
        setAllBrands,
        allCars,
        allBrands,
        CreateAnnouncement,
        isCreateAnnouncementSucessOpen,
        setIsCreateAnnouncementSucessOpen,
        setIsCreateAnnouncementOpen,
        isCreateAnnouncementOpen,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
