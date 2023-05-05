import { ReactNode } from "react";
import { IUserData } from "./users";

export interface IAnnoucementInterface {
  annoucements: any;
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
  user: IUserData;
  map?(arg0: (car: ICarBrand) => void): ReactNode;
  image: [
    {
      id: string;
      imageUrl: string;
    }
  ];
}

export interface IAnnouceProfileCardView {
  name: string;
  annouces: IAnnoucementInterface[];
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
  image?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  images?: (string | undefined)[];
}

export interface ICardPropInterface {
  data: IAnnoucementInterface;
}

export interface ICarBrand {
  name: string;
}
