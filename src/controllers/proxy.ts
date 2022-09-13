import fetch from 'node-fetch';
import type express from 'express';
import responseApi from '../helpers/apiResponse';
import { errors } from '../helpers/constants';

const authMiddlewares =  require ( '../middlewares/auth');

async function metarCall(req: express.Request, res: express.Response) {
    try {
        if (!req.body.airport || !req.body.token) {
            return responseApi.errorResponse(
                res,
                errors.missArgument.code,
                errors.missArgument.message,
            );
        }
        const result = await fetch(`https://avwx.rest/api/taf/${req.body.airport}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `BEARER ${req.body.token}`,
            },
        });
        const json = await result.json();

        return responseApi.successResponseWithData(res, json);
    } catch (e) {
        console.log('test');
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

exports.metar = [
    authMiddlewares.checkUser,
    metarCall,
];
