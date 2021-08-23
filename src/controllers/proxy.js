const fetch = require('node-fetch');
const authMiddlewares = require('../middlewares/auth');
const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');

async function metarCall(req, res) {
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
        return responseApi.successResponseWithData(res, 'Success', json);
    } catch (e) {
        console.log(e);
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
