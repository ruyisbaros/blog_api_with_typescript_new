
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
    currentUser: IUser,
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
export interface ICategories {
    categories: any[]
}
export interface IBlogs {
    blogs: HomeBlog[]
}
export interface ICategory {
    _id?: string
    name: string
    createdAt: string
    updatedAt: string
}
export interface HomeBlog {
    _id?: string
    user?: IUser,
    title: string,
    description: string,
    content: string,
    category: ICategory
    thumbnail: string | File,
    createdAt: string,
}
export interface IBlog {
    _id?: string
    user?: string | IUser,
    title: string,
    description: string,
    content: string,
    category: string
    thumbnail: string | File,
    createdAt: string,
}
/* export interface IImageFile {
    file?: File
} */
/* export interface IUserRegisterInput {
    name: string
    account: string
    password: string
}
export interface IUserRegisterResponse {
    name: string
    account: string
    password: string
} */

export type InputChange = ChangeEvent<
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
>;
export type FormSubmit = FormEvent<HTMLFormElement>;