const authMiddlewares = require('../middlewares/auth');
const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const Vac = require('../models/VacPlan.Model');

async function get(req, res) {
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
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function getAll(req, res) {
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
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
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
