import type express from 'express';
import type { Request } from '../controllers/Type';
import apiResponse from '../helpers/apiResponse';
import { errors } from '../helpers/constants';

const { PlaneModel } = require('../models/Plane.Model.ts');

async function checkPlaneExists(req: Request, res: express.Response, next: express.NextFunction) {
    try {
        const { Registration } = req.body;
        const plane = await PlaneModel.findOne({ Registration, userId: req.user.id });

        if (plane) return (apiResponse.errorResponse(res, errors.planeExist.code, errors.planeExist.message));

        return next();
    } catch (e) {
        return apiResponse.internError(res, e);
    }
}

exports.checkExistPlane = [
    checkPlaneExists,
];
