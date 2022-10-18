const authMiddlewares = require('../middlewares/auth.ts');
const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const Vac = require('../models/VacPlan.Model.ts');

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
        return responseApi.internError(res, e);
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
