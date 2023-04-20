import { ReactNode } from "react";
import { JsxElement } from "typescript";

export interface IAnnouceInterface {
  id: string;
  brand: string;
  model: string;
  fabrication_year: string;
  km: string;
  color: string;
  fuel_type: string;
  price: number;
  fipe: number;
  description: string;
  cover_img: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_good_price: boolean;
  map?(arg0: (car: ICarBrand) => void): ReactNode;
}

export interface IAnnouncementRequest {
  brand: string;
  model: string;
  fabrication_year: string;
  km: string;
  color: string;
  fuel_type: string;
  price: number;
  fipe: number;
  description: string;
  cover_img: string;
  image: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;
}

export interface ICardPropInterface {
  data: IAnnouceInterface;
}

export interface ICarBrand {
  name: string;
}
