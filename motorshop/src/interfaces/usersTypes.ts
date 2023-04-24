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
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IProviderProps {
  children: ReactNode;
}

export interface IRegisterUser {
  nome: string;
  email: string;
  cpf: string;
  phone: string;
  bornDate: Date;
  description: string;
  cep: string;
  state: string;
  city: string;
  addressComplement: string;
  typeAccount: string;
  number: string;
  password: string;
}
