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
    //loading(true)
    try {
      const response = await api.post("/announcement", data);
      setUserAnnouncements([userAnnouncements, ...response.data]);
      //colocar modal de sucesso aqui
    } catch (error) {
      console.error(error);
    } finally {
      //loading(false)
    }
  };
  return (
    <AnnouncementContext.Provider
      value={{ getAllCars, allCars, allBrands, CreateAnnouncement }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
