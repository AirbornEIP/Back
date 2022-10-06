import type express from 'express';

const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');

const flyPlan = require('../models/FlyPlan.Model');
// eslint-disable-next-line import/extensions
const authMiddlewares = require('../middlewares/auth');
const flyplanHistory = require('../models/FlyplanHistory');

// async function getHistory(req: express.Request, res: express.Response) {
//     try {
//         const {title} = req.body;
//
//         const idHistory = await flyplanHistory.find({ flyplanId: Flyplan._id });
//
//         return 0;
//     } catch (e) {
//         console.log(e);
//         return responseApi.errorResponse(
//             res,
//             errors.interneError.code,
//             errors.interneError.message,
//         );
//     }
// }

async function addHistory(req: express.Request, res: express.Response) {
    try {
        const { title, data } = req.body;
        if (!title || !data) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        const Flyplan = await flyPlan.findOne({
            userId: req.user.id,
            title: req.body.title,
        });
        // eslint-disable-next-line no-underscore-dangle
        const idHistory = await flyplanHistory.find({ flyplanId: Flyplan._id });
        // eslint-disable-next-line new-cap
        const history = new flyplanHistory({
            // eslint-disable-next-line no-underscore-dangle
            flyplanId: Flyplan._id,
            data,
            titleParent: Flyplan.title,
            userId: req.user._id,
            id: idHistory[idHistory.length - 1].id + 1,
        });
        await history.save();
        return res.send('History saved');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function addPlan(req: express.Request, res: express.Response) {
    try {
        let isPublic = false;
        if (!req.body.title || !req.body.data || typeof req.body.data !== 'string') {
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
        await plan.save();
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

async function removePlan(req: express.Request, res: express.Response) {
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

async function getPlan(req: express.Request, res: express.Response) {
    try {
        const list = await flyPlan.findOne({ userId: req.user.id, title: req.body.title });
        if (!req.body.title) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        if (!list) {
            return responseApi.errorResponse(res, errors.noOnePlan.code, errors.noOnePlan.message);
        }
        return responseApi.successResponseWithData(res, list);
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function getAllPlan(req: express.Request, res: express.Response) {
    try {
        const list = await flyPlan.find({ userId: req.user.id });
        if (list.length >= 1) return responseApi.successResponseWithData(res, list);
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

exports.addHistory = [
    authMiddlewares.checkUser,
    addHistory,
];

// exports.addHistory = [
//     authMiddlewares.checkUser,
//     // getHistory,
// ];
