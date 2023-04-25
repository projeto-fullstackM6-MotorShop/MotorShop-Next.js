import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IChildren } from "@/interfaces/misc";
import { useAnnouncement } from "./announcementContext";

interface filterProviderData {
  model: null | string;
  setmodel: Dispatch<SetStateAction<null | string>>;
  color: null | string;
  setcolor: Dispatch<SetStateAction<null | string>>;
  year: null | string;
  setyear: Dispatch<SetStateAction<null | string>>;
  fuel: null | string;
  setfuel: Dispatch<SetStateAction<null | string>>;
  allModels: never[];
  setAllModels: Dispatch<SetStateAction<string[]>>;
  allColors: string[];
  setallColors: Dispatch<SetStateAction<string[]>>;
  allYears: string[];
  setallYears: Dispatch<SetStateAction<string[]>>;
  allFuels: string[];
  setallFuels: Dispatch<SetStateAction<string[]>>;
  getAllModels: () => Promise<void>;
}

export const FilterContext = createContext<filterProviderData>(
  {} as filterProviderData
);

export const FilterProvider = ({ children }: IChildren) => {
  const { allAnnouncements, allBrands } = useAnnouncement();

  const [model, setmodel] = useState<string | null>(null);
  const [allModels, setAllModels] = useState([] as any);

  const [color, setcolor] = useState<string | null>(null);
  const [allColors, setallColors] = useState([
    "Azul",
    "Branca",
    "Cinza",
    "Prata",
    "Preta",
    "Verde",
  ]);

  const [year, setyear] = useState<string | null>(null);
  const [allYears, setallYears] = useState([
    "2022",
    "2021",
    "2018",
    "2015",
    "2013",
    "2012",
    "2010",
  ]);

  const [fuel, setfuel] = useState<string | null>(null);
  const [allFuels, setallFuels] = useState([
    "Diesel",
    "Etanol",
    "Gasolina",
    "Flex",
  ]);

  const getAllModels = async () => {
    const models = allAnnouncements.map((car) => car.model);
    setAllModels(models);
  };

  return (
    <FilterContext.Provider
      value={{
        getAllModels,
        model,
        setmodel,
        allModels,
        setAllModels,
        color,
        setcolor,
        allColors,
        setallColors,
        year,
        setyear,
        allYears,
        setallYears,
        fuel,
        setfuel,
        allFuels,
        setallFuels,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
