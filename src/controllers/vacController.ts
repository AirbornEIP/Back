import express from 'express';
import type { Request } from './Type';

const authMiddlewares = require('../middlewares/auth.ts');
const responseApi = require('../helpers/apiResponse.ts');
const { errors } = require('../helpers/constants.ts');
const Vac = require('../models/VacPlan.Model.ts');

async function get(req: Request, res: express.Response) {
    try {
        const filter = { name: req.body.airport };
        const vac = await Vac.findOne(filter);
        if (!vac) {
            return responseApi.errorResponse(
                res,
                errors.wrongAirport.code,
                errors.wrongAirport.message,
            );
        }
        return responseApi.successResponseWithData(res, { link: vac.link });
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function getAll(req: Request, res: express.Response) {
    try {
        const vac = await Vac.find();
        if (!vac) {
            return responseApi.errorResponse(
                res,
                errors.wrongAirport.code,
                errors.wrongAirport.message,
            );
        }

        return responseApi.successResponseWithData(res, { link: vac });
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

exports.getVac = [
    authMiddlewares.checkUser,
    get,
];

exports.getAllVac = [
    authMiddlewares.checkUser,
    getAll,
];
