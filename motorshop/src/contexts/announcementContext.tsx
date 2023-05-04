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
  getAnnouncementsForProfile: () => Promise<void>;
  announcementProfileView: IAnnoucementInterface[];
  userView: IUserData | null;
  CreateAnnouncement: (data: IAnnouncementRequest) => Promise<void>;
  getAllAnnouncements: () => void;
  setisEditOrDeleteAnnouncementOpen: Dispatch<SetStateAction<boolean>>
  isEditOrDeleteAnnouncementOpen: boolean
  getAnnouncementById: (id: string) => Promise<void>
  editAnnouncement: (data: IAnnouncementRequest) => Promise<void>
  toRechargePage: (id: string | string[] | undefined) => Promise<void>
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

  const { token } = useAuth();
  const router = useRouter();
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
      setannouncementView(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  const editAnnouncement = async (data: IAnnouncementRequest) => {
    
    try {
      await api.patch(`/announcement/${announcementView?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getAnnouncementsForProfile()

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

  const toRechargePage = async (id: string | string[] | undefined ) => {
    try {      
      const res = await api.get(`/profile/${id}`);     
      setannouncementProfileView(res.data);
    } catch(error) {
      console.log(error)
    }
  }

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
        setisEditOrDeleteAnnouncementOpen,
        isEditOrDeleteAnnouncementOpen,
        getAnnouncementById,
        editAnnouncement,
        toRechargePage
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
