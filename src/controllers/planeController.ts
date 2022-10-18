import express from 'express';
import type { Request } from './Type';

const { PlaneModel } = require('../models/Plane.Model.ts');
const authMiddlewares = require('../middlewares/auth.ts');
const planesMiddlewares = require('../middlewares/planes.ts');
const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');

async function AddPlane(req: Request, res: express.Response) {
    try {
        const {
            Registration,
            Model,
            Vmax,
            MountingSpeed,
            Altitude,
        } = req.body;
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
        return responseApi.internError(res, e);
    }
}

async function getAllPlane(req: Request, res: express.Response) {
    try {
        const planes = await PlaneModel.find({ userId: req.user.id });

        if (!planes) return responseApi.errorResponse(res, errors.noPlaneAreRegistered.code, errors.noPlaneAreRegistered.message);
        return (await responseApi.successResponseWithData(res, {
            data: {
                planes,
            },
        }));
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function removePlane(req: Request, res: express.Response) {
    try {
        const { Registration } = req.body;
        if (!Registration) return (responseApi.errorResponse(res, errors.planeMiss.code, errors.planeMiss.message));
        const plane = await PlaneModel.findOneAndDelete({ Registration, userId: req.user.id });
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
        return responseApi.internError(res, e);
    }
}

async function getPlane(req: Request, res: express.Response) {
    try {
        const { Registration } = req.query;
        if (!Registration) return (responseApi.errorResponse(res, errors.planeMiss.code, errors.planeMiss.message));
        const plane = await PlaneModel.findOne({ Registration, userId: req.user.id });
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
        return responseApi.internError(res, e);
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
