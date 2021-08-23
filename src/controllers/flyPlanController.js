const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const flyPlan = require('../models/FlyPlan.Model');
const authMiddlewares = require('../middlewares/auth');

async function addPlan(req, res) {
    try {
        let isPublic = false;
        if (!req.body.title || !req.body.data) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        if (req.body.isPublic === true) isPublic = true;
        const checkExistingPlan = await flyPlan.findOne({
            userId: req.user.id,
            title: req.body.title,
        });
        if (checkExistingPlan) {
            return responseApi.errorResponse(res,
                errors.planAlreadyExist.code,
                errors.planAlreadyExist.message);
        }
        // eslint-disable-next-line new-cap
        const plan = new flyPlan({
            userId: req.user.id,
            title: req.body.title,
            isPublic,
            data: req.body.data,
        });
        plan.save();
        return responseApi.successResponse(res, 'Success');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function removePlan(req, res) {
    try {
        if (!req.body.remove) {
            return responseApi.errorResponse(
                res,
                errors.removeMissing.code,
                errors.removeMissing.message,
            );
        }
        const search = await flyPlan.deleteOne({ title: req.body.remove, userId: req.user.id });
        if (search.deletedCount < 1) {
            return responseApi.errorResponse(res, // aucune recherche de ce type exite
                errors.missingPlan.code,
                errors.missingPlan.message);
        }
        return responseApi.successResponse(res, 'your search has been deleted');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function getPlan(req, res) {
    try {
        const list = await flyPlan.findOne({ userId: req.user.id, title: req.body.title });
        if (!req.body.title) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        if (list) return responseApi.successResponseWithData(res, 'Success', list);
        return responseApi.errorResponse(res, errors.noOnePlan.code, errors.noOnePlan.message);
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function getAllPlan(req, res) {
    try {
        const list = await flyPlan.find({ userId: req.user.id });
        if (list.length >= 1) return responseApi.successResponseWithData(res, 'Success', list);
        return responseApi.errorResponse(res, errors.noOnePlan.error, errors.noOnePlan.message);
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

exports.add = [
    authMiddlewares.checkUser,
    addPlan,
];
exports.remove = [
    authMiddlewares.checkUser,
    removePlan,
];

exports.get = [
    authMiddlewares.checkUser,
    getPlan,
];

exports.getAll = [
    authMiddlewares.checkUser,
    getAllPlan,
];
