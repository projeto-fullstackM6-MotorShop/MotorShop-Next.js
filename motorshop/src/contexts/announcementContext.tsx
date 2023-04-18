import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IChildren } from "@/interfaces/misc";
import { carsApi } from "@/services/api";
import { IAnnouceInterface } from "../interfaces/annouce";

interface announcementProviderData {
  getAllCars: () => Promise<void>;
  allCars: IAnnouceInterface[];
  allBrands: string[];
}

export const AnnouncementContext = createContext<announcementProviderData>(
  {} as announcementProviderData
);

export const AnnouncementProvider = ({ children }: IChildren) => {
  const [allCars, setAllCars] = useState([] as IAnnouceInterface[]);
  const [allBrands, setAllBrands] = useState([] as string[]);

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
  return (
    <AnnouncementContext.Provider value={{ getAllCars, allCars, allBrands }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
