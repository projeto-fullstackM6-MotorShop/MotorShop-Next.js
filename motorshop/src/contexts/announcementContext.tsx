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
  IAnnouncementUpdate,
} from "../interfaces/annoucement";
import { useAuth } from "./authContext";
import { useRouter } from "next/router";
import { IUserData, IUserWithAnnoucements } from "@/interfaces/users";
import { Box, useToast } from "@chakra-ui/react";
import { destroyCookie, parseCookies, setCookie } from "nookies";

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
  getAnnouncementsForProfile: (userId: string) => Promise<void>;
  announcementProfileView: IAnnoucementInterface[];
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
  setisEditOrDeleteAnnouncementOpen: Dispatch<SetStateAction<boolean>>;
  isEditOrDeleteAnnouncementOpen: boolean;
  getAnnouncementById: (annoucementId: string) => Promise<void>;
  editAnnouncement: (
    data: IAnnouncementUpdate,
    annoucementId: string
  ) => Promise<void>;
  setdeleteAnnounceModal: Dispatch<SetStateAction<boolean>>;
  deleteAnnounceModal: boolean;
  deleteAnnounce: (annoucementId: string) => Promise<void>;
  userWithAnnoucements: IUserWithAnnoucements | null;
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
  const [isEditOrDeleteAnnouncementOpen, setisEditOrDeleteAnnouncementOpen] =
    useState(false);
  const [allAnnouncements, setAllAnnouncements] = useState([] as any);
  const [announcementView, setannouncementView] =
    useState<IAnnoucementInterface | null>(null);
  const [userView, setuserView] = useState<IUserData | null>(null);
  const [announcementProfileView, setannouncementProfileView] = useState<
    IAnnoucementInterface[]
  >([] as IAnnoucementInterface[]);

  const [deleteAnnounceModal, setdeleteAnnounceModal] = useState(false);
  const [userWithAnnoucements, setUserWithAnnoucements] =
    useState<IUserWithAnnoucements | null>(null);

  const { token, userLoged } = useAuth();

  const toast = useToast();

  useEffect(() => {
    const brands = Object.keys(allCars);
    setAllBrands(brands);
    getAllAnnouncements();
  }, [allCars]);

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
      getAnnouncementsForProfile(userLoged?.id as string);
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

  const getAnnouncementById = async (id: string) => {
    try {
      const res = await api.get(`/announcement/${id}`);
      setannouncementView(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editAnnouncement = async (
    data: IAnnouncementUpdate,
    annoucementId: string
  ) => {
    try {
      await api.patch(`/announcement/${annoucementId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getAnnouncementsForProfile(userLoged?.id as string);

      toast({
        title: "sucess",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box bg={"sucess.1"} color={"sucess.3"} p={3}>
            Informaçoes do anuncio atualizado com sucesso!
          </Box>
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAnnouncementsForProfile = async (userId: string) => {
    try {
      const res = await api.get(`/profile/${userId}`);

      setUserWithAnnoucements(res.data);
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

  const deleteAnnounce = async (annoucementId: string) => {
    try {
      await api.delete(`/announcement/${annoucementId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getAnnouncementsForProfile(userLoged?.id as string);
    } catch (error) {
      console.error(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * 12;
  const endIndex = startIndex + 12;
  const currentCars: IAnnoucementInterface[] = allAnnouncements.slice(
    startIndex,
    endIndex
  );

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setNumCountPage(numCountPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setNumCountPage(numCountPage + 1);
  };

  const [numCountPage, setNumCountPage] = useState(1);

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
        announcementProfileView,
        getAnnouncementsForProfile,
        userView,
        currentCars,
        handleNextPage,
        handlePreviousPage,
        endIndex,
        currentPage,
        numPageEnd,
        numCountPage,
        setisEditOrDeleteAnnouncementOpen,
        isEditOrDeleteAnnouncementOpen,
        getAnnouncementById,
        editAnnouncement,
        setdeleteAnnounceModal,
        deleteAnnounceModal,
        deleteAnnounce,
        userWithAnnoucements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
