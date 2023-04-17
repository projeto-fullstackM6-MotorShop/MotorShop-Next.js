import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IChildren } from "@/interfaces/misc";
import { carsApi } from "@/services/api";
import { IAnnouceInterface } from "../interfaces/annouce";

interface announcementProviderData {
  getAllCars: () => Promise<void>;
}

export const announcementContext = createContext<announcementProviderData>(
  {} as announcementProviderData
);

export const AnnouncementProvider = ({ children }: IChildren) => {
  const [allCars, setAllCars] = useState([] as IAnnouceInterface[]);

  const getAllCars = async () => {
    try {
      const response = await carsApi.get<IAnnouceInterface[]>("/cars");
      setAllCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <announcementContext.Provider value={{ getAllCars }}>
      {children}
    </announcementContext.Provider>
  );
};
