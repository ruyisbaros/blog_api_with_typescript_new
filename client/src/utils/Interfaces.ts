import { ChangeEvent, FormEvent } from "react";

export interface IUser {
    _id: string
    account: string
    avatar: string
    createdAt: string
    name: string
    password: string
    role: string
    type: string
    updatedAt: string
}
//For redux:currentUser slicer
export interface ICurrentUser {
    currentUser: object,
    message: string
    token: string,
    logging: boolean,
}
//For redux:loadingStatus slicer
export interface ILoadingStatus {
    loadStatus: {
        loading: boolean,
    }
}
export interface IUserLoginInput {
    account: string
    password: string
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