import fetch from 'node-fetch';
import type express from 'express';

const errors = require('../helpers/constants.ts');
const responseApi = require('../helpers/apiResponse.ts');
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
        const url = `https://avwx.rest/api${req._parsedUrl.pathname}/${req.body.airport}`;
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer 0jgAcZC_eyn3fe9E7lSH8ToflNa3Wm7CYTrz4cSrx_0',
            },
        });
        // }
        console.log(result);
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
