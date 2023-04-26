import { ReactNode } from "react";

export interface IUserData {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth_date: string;
  is_seller: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegisterUserData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth_date: string;
  password: string;
  description?: string;
  is_seller?: boolean;
  address: IAddressRegister;
}

export interface IUpdateUserData {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birth_date?: string;
  password?: string;
  description?: string;
  is_seller?: boolean;
}

export interface IAddressRegister {
  zip_code: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IProviderProps {
  children: ReactNode;
}
