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
import { IAnnoucementInterface } from "@/interfaces/annoucement";

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
  setClearFilter: Dispatch<SetStateAction<boolean>>;
  setMinimumKm: Dispatch<SetStateAction<string>>;
  minimumKm: string;
  setMaximumKm: Dispatch<SetStateAction<string>>;
  maximumKm: string;
  setMinimumPrice: Dispatch<SetStateAction<string>>;
  minimumPrice: string;
  setMaximumPrice: Dispatch<SetStateAction<string>>;
  maximumPrice: string;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  isFilterOpen: boolean;
  isFilterActive: boolean;
  getAllModels: () => Promise<void>;
  filterBrand: (array: IAnnoucementInterface[]) => any;
  getFilteredBrandCars: (brand: string) => any;
  getFilteredPrice: (array: IAnnoucementInterface[]) => any;
  getFilteredKm: (array: IAnnoucementInterface[]) => any;
  getFilteredColor: (color: string) => any;
  getFilteredFuelTypeCars: (fuelType: string) => any;
  getFilteredModelCars: (model: string) => any;
  getFilteredYear: (year: string) => any;
  setIsFilterActive: Dispatch<SetStateAction<boolean>>;
}

export const FilterContext = createContext<filterProviderData>(
  {} as filterProviderData
);

export const FilterProvider = ({ children }: IChildren) => {
  const { allAnnouncements, allBrands, setAllBrands, setAllAnnouncements } =
    useAnnouncement();

  const [model, setmodel] = useState<string | null>(null);
  const [allModels, setAllModels] = useState([] as any);

  const [color, setcolor] = useState<string | null>(null);
  const [allColors, setallColors] = useState([] as any);

  const [year, setyear] = useState<string | null>(null);
  const [allYears, setAllYears] = useState([] as any);

  const [fuel, setfuel] = useState<string | null>(null);
  const [allFuelTypes, setAllFuelTypes] = useState([] as any);

  const [clearFilter, setClearFilter] = useState(false);

  let [minimumKm, setMinimumKm] = useState("");
  let [maximumKm, setMaximumKm] = useState("");

  let [minimumPrice, setMinimumPrice] = useState("");
  let [maximumPrice, setMaximumPrice] = useState("");

  const [isFilterActive, setIsFilterActive] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      uniqueModels.add(model);
    });
    const modelsArray = Array.from(uniqueModels);
    setAllModels(modelsArray);
  };

  const filterBrand = (array: IAnnoucementInterface[]) => {
    const uniqueBrand = new Set();
    array.map((announcement) => uniqueBrand.add(announcement.brand));
    const brandsArray: any = Array.from(uniqueBrand);
    setAllBrands(brandsArray);
  };

  const getFilteredBrandCars = (brand: string) => {
    const filteredAnnouncements = allAnnouncements.filter((announcement) => {
      return announcement.brand.toLowerCase() === brand.toLowerCase();
    });
    setAllAnnouncements(filteredAnnouncements);
  };

  const getFilteredYear = (year: string) => {
    const FilteredCarsByYear = allAnnouncements.filter((announcement) => {
      return announcement.fabrication_year.toLowerCase() === year.toLowerCase();
    });

    setAllAnnouncements(FilteredCarsByYear);
    filterBrand(FilteredCarsByYear);
  };

  const getFilteredModelCars = (model: string) => {
    const filteredCarByModel = allAnnouncements.filter((announcement) => {
      return (
        announcement.model.split(" ")[0].toLowerCase() === model.toLowerCase()
      );
    });
    setAllAnnouncements(filteredCarByModel);
    filterBrand(filteredCarByModel);
  };

  const getFilteredFuelTypeCars = (fuelType: string) => {
    const filteredCarByFuelType = allAnnouncements.filter((announcement) => {
      return announcement.fuel_type.toLowerCase() === fuelType.toLowerCase();
    });

    setAllAnnouncements(filteredCarByFuelType);
    filterBrand(filteredCarByFuelType);
  };

  const getFilteredColor = (color: string) => {
    const filteredCarByColor = allAnnouncements.filter((announcement) => {
      return announcement.color.toLowerCase() === color.toLowerCase();
    });
    setAllAnnouncements(filteredCarByColor);
    filterBrand(filteredCarByColor);
  };

  const getFilteredKm = (announcements: any) => {
    const filteredByKm = announcements.filter((car: any) => {
      if (minimumKm && maximumKm) {
        return (
          parseInt(car.km) >= parseInt(minimumKm) &&
          parseInt(car.km) <= parseInt(maximumKm)
        );
      } else if (minimumKm) {
        return parseInt(car.km) >= parseInt(minimumKm);
      } else if (maximumKm) {
        return parseInt(car.km) <= parseInt(maximumKm);
      }
    });
    return filteredByKm;
  };

  const getFilteredPrice = (announcements: any) => {
    const filteredByPrice = announcements.filter((car: any) => {
      if (minimumPrice && maximumPrice) {
        return (
          car.price >= parseInt(minimumPrice) &&
          car.price <= parseInt(maximumPrice)
        );
      } else if (minimumPrice) {
        return car.price >= parseInt(minimumPrice);
      } else if (maximumPrice) {
        return car.price <= parseInt(maximumPrice);
      }
    });
    return filteredByPrice;
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
        setClearFilter,
        setMinimumKm,
        setMaximumKm,
        setMinimumPrice,
        setMaximumPrice,
        minimumKm,
        maximumKm,
        minimumPrice,
        maximumPrice,
        filterBrand,
        getFilteredBrandCars,
        getFilteredPrice,
        getFilteredKm,
        getFilteredColor,
        getFilteredFuelTypeCars,
        getFilteredModelCars,
        getFilteredYear,
        isFilterActive,
        setIsFilterActive,
        setIsFilterOpen,
        isFilterOpen,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
