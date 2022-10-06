import type express from 'express';

const fetch = require('node-fetch');

const authMiddlewares = require('../middlewares/auth');
const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');

const Authorization = process.env.TOKEN_METAR_TAF;


async function get(req: express.Request, res: express.Response) {
    try {
        const { airport } = req.body;
        if (!airport) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.missArgument.code, errors.missArgument.message);
        }
        const response = await fetch(`https://avwx.rest/api/metar/${airport}`, {
            headers: { Authorization },
        });
        console.log(await response.json());
        return responseApi.successResponseWithData(res, await response.json());
    } catch (e) {
        // eslint-disable-next-line max-len
        console.log(e);
        // eslint-disable-next-line max-len
        return responseApi.errorResponse(res, errors.interneError.code, errors.interneError.message);
    }
}

exports.getTaf = [
    authMiddlewares.checkUser,
    get,
];
