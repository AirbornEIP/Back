import type express from 'express';
import apiResponse from '../helpers/apiResponse';
import { errors } from '../helpers/constants';

const { PlaneModel } = require('../models/Plane.Model.ts');

// eslint-disable-next-line consistent-return,max-len
async function checkPlaneExists(req: any, res: express.Response, next: express.NextFunction) {
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
