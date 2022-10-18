import fetch from 'node-fetch';
import type express from 'express';
import responseApi from '../helpers/apiResponse';
import { errors } from '../helpers/constants';

const authMiddlewares = require('../middlewares/auth.ts');

async function getPlan(req: express.Request, res: express.Response) {
    try {
        if (!req.body.airport) {
            return responseApi.errorResponse(
                res,
                errors.missArgument.code,
                errors.missArgument.message,
            );
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        const result = await fetch(`https://avwx.rest/api${req._parsedUrl.pathname}/${req.body.airport}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'BEARER 0jgAcZC_eyn3fe9E7lSH8ToflNa3Wm7CYTrz4cSrx_0',
            },
        });
        const json = await result.json();

        return responseApi.successResponseWithData(res, json);
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

exports.getPlan = [
    authMiddlewares.checkUser,
    getPlan,
];
