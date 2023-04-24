import { ReactNode } from "react"

export interface IUserLogin {
    email: string,
    password: string
}

export interface IProviderProps {
    children: ReactNode
}

export interface IRegisterUser {
    nome: string
    email: string
    cpf: string
    phone: string
    bornDate: Date
    description: string
    cep: string
    state : string
    city: string
    addressComplement: string
    typeAccount: string
    number: string
    password: string
}