import { Request } from 'express';

import { Document } from "mongoose";


export interface ILogUser extends Document {
    _id: string
    name: string,
    account: string,
    password: string,
    avatar: string
    role: string,
    type: string
    _doc: object
}

export interface INewUser {
    name: string,
    account: string,
    password: string,
}

export interface IDecodedToken {
    id: string
    iat: number
    exp: number
}

export interface IReqAuth extends Request {
    user?: ILogUser
}

export interface IComment extends Document {
    owner: string,
    blog_id: string,
    blog_user_id: string,
    replyCM: string[],
    reply_user: string,
    content: string,
    _doc: object
}