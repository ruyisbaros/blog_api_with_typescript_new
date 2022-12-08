import { ChangeEvent, FormEvent } from "react";

export interface IParams {
    page: string;
    slug: string

}
export interface ICurrentUser {
    currentUser: object,
    message: string
    token: string,
    logging: boolean,
}
export interface IUserLoginInput {
    account: string
    password: string
}
export interface IUserLoginResponse {
    message: string
    user: object
}
export interface IUserRegisterInput {
    name: string
    account: string
    password: string
}
export interface IUserRegisterResponse {
    name: string
    account: string
    password: string
}

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;