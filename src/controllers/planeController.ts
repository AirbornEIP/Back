import express from 'express';

const { PlaneModel } = require('../models/Plane.Model.ts');
const authMiddlewares = require('../middlewares/auth.ts');
const planesMiddlewares = require('../middlewares/planes.ts');
const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');

type user = {
    email: string,
    password: string,
    banned: boolean,
    verifiedEmail: boolean,
    name: string,
    id: string,
    avatar: string,
    surname: string,
    theme: boolean,
    admin: boolean,
    language: number,
    createdAt: Date,
    updatedAt: Date,
}

type request = express.Request & {
  user: user
}

async function AddPlane(req: request, res: express.Response) {
    try {
        console.log(req.user.id);
        const {
            Registration,
            Model,
            Vmax,
            MountingSpeed,
            Altitude,
        } = req.body;
        // eslint-disable-next-line max-len
        if (!Registration || !Model || !Vmax || !MountingSpeed || !Altitude) return (responseApi.errorResponse(res, errors.addPlaneError.code, errors.addPlaneError.message));
        const plane = new PlaneModel({
            Registration,
            Model,
            Vmax,
            MountingSpeed,
            Altitude,
            userId: req.user.id,
        });
        const saved = await plane.save();
        return (responseApi.successResponseWithData(res, {
            message: 'Plane are saved',
            data:
            // eslint-disable-next-line no-underscore-dangle
                { ...saved._doc },
        }));
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function getAllPlane(req: request, res: express.Response) {
    try {
        const planes = await PlaneModel.find({ userId: req.user.id });

        // eslint-disable-next-line max-len
        if (!planes) return responseApi.errorResponse(res, errors.noPlaneAreRegistered.code, errors.noPlaneAreRegistered.message);

        return (await responseApi.successResponseWithData(res, {
            data: {
                planes,
            },
        }));
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function removePlane(req: request, res: express.Response) {
    try {
        const { Registration } = req.body;
        // eslint-disable-next-line max-len
        if (!Registration) return (responseApi.errorResponse(res, errors.planeMiss.code, errors.planeMiss.message));
        const plane = await PlaneModel.findOneAndDelete({ Registration, userId: req.user.id });
        // eslint-disable-next-line max-len
        if (!plane) return (responseApi.errorResponse(res, errors.noPlaneAreRegistered.code, errors.noPlaneAreRegistered.message));
        const {
            Model, Vmax, MountingSpeed, Altitude,
        } = plane;
        return responseApi.successResponseWithData(res, {
            message: 'Successfully deleted',
            plane: {
                Registration,
                Model,
                Vmax,
                MountingSpeed,
                Altitude,
            },
        });
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function getPlane(req: request, res: express.Response) {
    try {
        const { Registration } = req.query;
        // eslint-disable-next-line max-len
        if (!Registration) return (responseApi.errorResponse(res, errors.planeMiss.code, errors.planeMiss.message));
        const plane = await PlaneModel.findOne({ Registration, userId: req.user.id });
        // eslint-disable-next-line max-len
        if (!plane) return (responseApi.errorResponse(res, errors.noPlaneAreRegistered.code, errors.noPlaneAreRegistered.message));
        const {
            Model, Vmax, MountingSpeed, Altitude,
        } = plane;
        return responseApi.successResponseWithData(res, {
            message: 'Success',
            plane: {
                Registration,
                Model,
                Vmax,
                MountingSpeed,
                Altitude,
            },
        });
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

exports.get = [
    authMiddlewares.checkUser,
    getPlane,
];

exports.getAll = [
    authMiddlewares.checkUser,
    getAllPlane,
];

exports.add = [
    authMiddlewares.checkUser,
    planesMiddlewares.checkExistPlane,
    AddPlane,
];

exports.delete = [
    authMiddlewares.checkUser,
    removePlane,
];
