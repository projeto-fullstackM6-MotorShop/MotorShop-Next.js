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
import {
  IAnnoucementInterface,
  IAnnouncementRequest,
} from "../interfaces/annoucement";
import { useAuth } from "./authContext";
import { useRouter } from "next/router";
import { IUserData } from "@/interfaces/users";

interface announcementProviderData {
  getAllCars: () => Promise<void>;
  allCars: IAnnoucementInterface[];
  setAllBrands: Dispatch<SetStateAction<string[]>>;
  allBrands: string[];
  setIsCreateAnnouncementSucessOpen: Dispatch<SetStateAction<boolean>>;
  isCreateAnnouncementSucessOpen: boolean;
  setIsCreateAnnouncementOpen: Dispatch<SetStateAction<boolean>>;
  isCreateAnnouncementOpen: boolean;
  setAllAnnouncements: Dispatch<
    SetStateAction<never[] | IAnnoucementInterface[]>
  >;
  allAnnouncements: IAnnoucementInterface[];
  setAllCars: Dispatch<SetStateAction<IAnnoucementInterface[]>>;
  setannouncementView: Dispatch<SetStateAction<IAnnoucementInterface | null>>;
  announcementView: IAnnoucementInterface | null;
  getAnnouncementsForProfile: () => Promise<void>;
  announcementProfileView: IAnnoucementInterface[];
  userView: IUserData | null;
  CreateAnnouncement: (data: IAnnouncementRequest) => Promise<void>;
  getAllAnnouncements: () => void;
  getAnnoucementById: (annoucementId: string) => void;
}

export const AnnouncementContext = createContext<announcementProviderData>(
  {} as announcementProviderData
);

export const AnnouncementProvider = ({ children }: IChildren) => {
  const [allCars, setAllCars] = useState([] as IAnnoucementInterface[]);
  const [allBrands, setAllBrands] = useState([] as string[]);
  const [userAnnouncements, setUserAnnouncements] = useState(
    [] as IAnnoucementInterface[]
  );
  const [isCreateAnnouncementSucessOpen, setIsCreateAnnouncementSucessOpen] =
    useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] =
    useState(false);
  const [allAnnouncements, setAllAnnouncements] = useState([] as any);

  const [announcementView, setannouncementView] =
    useState<IAnnoucementInterface | null>(null);
  const [userView, setuserView] = useState<IUserData | null>(null);
  const [announcementProfileView, setannouncementProfileView] = useState<
    IAnnoucementInterface[]
  >([] as IAnnoucementInterface[]);

  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const brands = Object.keys(allCars);
    setAllBrands(brands);
    getAllAnnouncements();
    getAnnouncementsForProfile();
  }, [allCars, announcementView]);

  const getAllCars = async () => {
    try {
      const response = await carsApi.get<IAnnoucementInterface[]>("/cars");
      setAllCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateAnnouncement = async (data: IAnnouncementRequest) => {
    try {
      const response = await api.post("/announcement", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserAnnouncements({ userAnnouncements, ...response.data });
      setIsCreateAnnouncementSucessOpen(true);
      setIsCreateAnnouncementOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAnnouncements = async () => {
    try {
      const response = await api.get("/announcement");
      setAllAnnouncements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAnnouncementsForProfile = async () => {
    try {
      const res = await api.get(`/profile/${announcementView?.user.id}`);
      const res2 = await api.get(`/user/${announcementView?.user.id}`);
      setuserView(res2.data);
      setannouncementProfileView(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAnnoucementById = async (annoucementId: string) => {
    try {
      const response = await api.get(`/announcement/${annoucementId}`);

      setannouncementView(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <AnnouncementContext.Provider
      value={{
        setAllCars,
        getAllCars,
        setAllBrands,
        allCars,
        allBrands,
        CreateAnnouncement,
        isCreateAnnouncementSucessOpen,
        setIsCreateAnnouncementSucessOpen,
        setIsCreateAnnouncementOpen,
        isCreateAnnouncementOpen,
        getAllAnnouncements,
        allAnnouncements,
        setAllAnnouncements,
        announcementView,
        setannouncementView,
        announcementProfileView,
        getAnnouncementsForProfile,
        userView,
        getAnnoucementById,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
