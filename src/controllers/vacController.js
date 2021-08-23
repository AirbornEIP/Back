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
        return responseApi.successResponseWithData(res, 'Success', vac.link);
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function update(req, res) {
    try {
        if (!req.body.data) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        const jsons = req.body.data;
        let vac;
        let filter = {};
        let listUpdate = {};
        for (let i = 0; jsons[i]; i++) {
            filter = { name: jsons[i].name };
            listUpdate = { link: jsons[i].link };
            // eslint-disable-next-line no-await-in-loop
            vac = await Vac.findOneAndUpdate(filter, listUpdate);
            if (!vac) {
                vac = new Vac({ name: jsons[i].name, link: jsons[i].link });
                vac.save();
            }
        }
        return responseApi.successResponse(res, 'Plan has been updated');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

exports.update = [
    authMiddlewares.checkUser,
    update,
];

exports.get = [
    authMiddlewares.checkUser,
    get,
];
