import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IChildren } from "@/interfaces/misc";

interface filterProviderData {
  model: null | string;
  setmodel: Dispatch<SetStateAction<null | string>>;
  color: null | string;
  setcolor: Dispatch<SetStateAction<null | string>>;
  year: null | string;
  setyear: Dispatch<SetStateAction<null | string>>;
  fuel: null | string;
  setfuel: Dispatch<SetStateAction<null | string>>;

  allModels: string[];
  setallModels: Dispatch<SetStateAction<string[]>>;
  allColors: string[];
  setallColors: Dispatch<SetStateAction<string[]>>;
  allYears: string[];
  setallYears: Dispatch<SetStateAction<string[]>>;
  allFuels: string[];
  setallFuels: Dispatch<SetStateAction<string[]>>;
}

export const FilterContext = createContext<filterProviderData>(
  {} as filterProviderData
);

export const FilterProvider = ({ children }: IChildren) => {
  const [model, setmodel] = useState<string | null>(null);
  const [allModels, setallModels] = useState([
    "Civic",
    "Corolla",
    "Cruze",
    "Fit",
    "Gol",
    "Ka",
    "Onix",
    "Pulse",
  ]);

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

  return (
    <FilterContext.Provider
      value={{
        model,
        setmodel,
        allModels,
        setallModels,
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
