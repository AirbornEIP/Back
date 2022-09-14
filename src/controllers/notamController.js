const fetch = require('node-fetch');
const authMiddlewares = require('../middlewares/auth');
const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');

const Authorization = process.env.TOKEN_METAR_TAF;

async function get(req, res) {
    try {
        if (!req.body.airport) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.missArgument.code, errors.missArgument.message);
        }
        const response = await fetch(`https://avwx.rest/api/metar/${req.body.airport}?airport=true&format=json&onfail=cache`, {
            headers: { Authorization },
        });
        return responseApi.successResponseWithData(res, await response.json());
    } catch (e) {
        // eslint-disable-next-line max-len
        return responseApi.errorResponse(res, errors.interneError.code, errors.interneError.message);
    }
}

exports.getNotam = [
    authMiddlewares.checkUser,
    get,
];
