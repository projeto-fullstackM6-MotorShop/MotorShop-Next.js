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
  goForprofile: () => void;
  userView: IUserData | null;
  CreateAnnouncement: (data: IAnnouncementRequest) => Promise<void>;
  getAllAnnouncements: () => void;
  currentCars: IAnnoucementInterface[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  endIndex: number;
  currentPage: number;
  numPageEnd: number;
  numCountPage: number;
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

  const goForprofile = () => {
    router.push("/profile");
  };

  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * 12
  const endIndex = startIndex + 12
  const currentCars: IAnnoucementInterface[] = allAnnouncements.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
    setNumCountPage(numCountPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    setNumCountPage(numCountPage + 1)

  }

  const [numCountPage, setNumCountPage] = useState(1)

  const numPageEnd = Math.ceil(allAnnouncements.length / 12);

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
        goForprofile,
        announcementProfileView,
        getAnnouncementsForProfile,
        userView,
        currentCars,
        handleNextPage,
        handlePreviousPage,
        endIndex,
        currentPage,
        numPageEnd,
        numCountPage
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
