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
import dataCar from "../../../dataTeste";

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
  setAllYears: Dispatch<SetStateAction<string[]>>;
  allFuelTypes: string[];
  setAllFuelTypes: Dispatch<SetStateAction<string[]>>;
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
  const [allColors, setallColors] = useState([] as any);

  const [year, setyear] = useState<string | null>(null);
  const [allYears, setAllYears] = useState([] as any);

  const [fuel, setfuel] = useState<string | null>(null);
  const [allFuelTypes, setAllFuelTypes] = useState([] as any);

  const getAllColors = () => {
    const uniqueColors = new Set();
    const colors = allAnnouncements.forEach((car) => {
      uniqueColors.add(car.color);
    });
    const colorsArray = Array.from(uniqueColors);
    setallColors(colorsArray);
  };

  const getAllyears = () => {
    const uniqueYears = new Set();
    const years = allAnnouncements.forEach((car) => {
      uniqueYears.add(car.fabrication_year);
    });
    const yearsArray = Array.from(uniqueYears);
    setAllYears(yearsArray);
  };

  const getAllFuelTypes = () => {
    const uniqueFuelTypes = new Set();
    const fuelType = allAnnouncements.forEach((car) => {
      uniqueFuelTypes.add(car.fuel_type);
    });
    const fuelTypeArray = Array.from(uniqueFuelTypes);
    setAllFuelTypes(fuelTypeArray);
  };

  const getAllModels = async () => {
    const uniqueModels = new Set();
    allAnnouncements.forEach((car) => {
      const model = car.model.split(" ")[0];
      const firstWord = parseInt(model);
      const modelName =
        firstWord.toString() === model ? car.model.split(" ")[1] : model;
      uniqueModels.add(modelName);
    });
    const modelsArray = Array.from(uniqueModels);
    setAllModels(modelsArray);
  };

  useEffect(() => {
    getAllModels();
    getAllColors();
    getAllyears();
    getAllFuelTypes();
  }, [allAnnouncements]);

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
        setAllYears,
        fuel,
        setfuel,
        allFuelTypes,
        setAllFuelTypes,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
