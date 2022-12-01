import mongoose from 'mongoose';

export type user = {
    email: string,
    password: string,
    _id: string,
    banned: boolean,
    verifiedEmail: boolean,
    name: string,
    avatar: string,
    surname: string,
    theme: boolean,
    admin: boolean,
    language: number,
    createdAt: Date,
    updatedAt: Date,
}

export type PlaneType = {
    userId: string,
    Registration: string,
    Model: number,
    Name: string,
    Consommation: number,
    FuelCapacity: number,
    Vmax: number,
    MountingSpeed: number
    Altitude: number,
    updatedAt: Date,
}

export type Vac = {
    nextUpdate: string,
    currentDate: string,
    createdAt: Date,
    updatedAt: Date,
}

export type ConfirmEmailType = {
    UserId: string,
    email: string,
    uuid: string,
    createdAt: Date,
}

export type ForgotPasswordType = {
    UserId: mongoose.Types.ObjectId,
    uuid: string,
}

export type RequestHistoryType = {
    link: string,
    method: string,
    body: JSON,
    header: mongoose.Types.Array<Headers>,
    createdAt: Date,
}

export type FeedBackType = {
    title: string,
    name: string,
    surname: string,
    email: string,
    userId: string,
    test: string,
    createdAt: Date,
}

export type VacType = {
    link: string,
    name: string,
    fullName: string,
    createdAt: Date,
    updatedAt: Date,
}

export type FlyplanHistoryType = {
    flyplanId: string,
    userId: string,
    titleParent: string,
    data: string,
    id: number,
    updatedAt: Date,
    createdAt: Date,
}

export type FlyplanType = {
    title: string,
    ownerName: string,
    userId: string,
    isPublic: boolean,
    history: [string],
    data: string,
    updatedAt: Date,
    createdAt: Date,
}
