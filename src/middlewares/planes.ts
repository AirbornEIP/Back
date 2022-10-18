import type express from 'express';
import apiResponse from '../helpers/apiResponse';
import { errors } from '../helpers/constants';

const { PlaneModel } = require('../models/Plane.Model.ts');

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
// eslint-disable-next-line consistent-return,max-len
async function checkPlaneExists(req: request, res: express.Response, next: express.NextFunction) {
    try {
        const { Registration } = req.body;
        const plane = await PlaneModel.findOne({ Registration, userId: req.user.id });
        // eslint-disable-next-line max-len
        if (plane) return (apiResponse.errorResponse(res, errors.planeExist.code, errors.planeExist.message));

        return next();
    } catch (e) {
        console.log(e);
    }
}

exports.checkExistPlane = [
    checkPlaneExists,
];
