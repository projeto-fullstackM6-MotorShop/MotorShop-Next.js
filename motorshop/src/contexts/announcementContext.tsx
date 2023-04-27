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
import { IAnnouceInterface, IAnnouncementRequest, ICardPropInterface } from "../interfaces/annouce";
import { useAuth } from "./authContext";
import { useRouter } from "next/router";
import { IUserData } from "@/interfaces/usersTypes";

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
  getAllAnnouncements: () => void;
  allAnnouncements: IAnnouceInterface[];
  announcementView: IAnnouceInterface | null
  setannouncementView: Dispatch<SetStateAction<IAnnouceInterface | null>>
  goForprofile: () => void
  announcementProfileView: IAnnouceInterface[]
  getAnnouncementsForProfile: () => Promise<void>
  userView: IUserData | null
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
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  const [announcementView, setannouncementView] = useState<IAnnouceInterface | null>(null)
  const [userView, setuserView] = useState<IUserData | null>(null)
  const [announcementProfileView, setannouncementProfileView] = useState<IAnnouceInterface[]>([] as IAnnouceInterface[])

  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const brands = Object.keys(allCars);
    setAllBrands(brands);
    getAllAnnouncements();
    getAnnouncementsForProfile()
  }, [allCars, announcementView]);

  const getAllCars = async () => {
    try {
      const response = await carsApi.get<IAnnouceInterface[]>("/cars");
      setAllCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateAnnouncement = async (data: IAnnouncementRequest) => {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
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
      console.log(res.data)
    } catch (error) {
      console.error(error);
    }
  };

  // const getUserForProfile = async () => {
  //   try {
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const goForprofile = () => {
    router.push("/profile");
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
        getAllAnnouncements,
        allAnnouncements,
        announcementView,
        setannouncementView,
        goForprofile,
        announcementProfileView,
        getAnnouncementsForProfile,
        userView
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
