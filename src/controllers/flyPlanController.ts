import type express from 'express';
import type { Request } from './Type';

const responseApi = require('../helpers/apiResponse.ts');
const { errors } = require('../helpers/constants.ts');
const authMiddlewares = require('../middlewares/auth.ts');
const { FlyPlanModel } = require('../models/FlyPlan.Model.ts');
const { FlyplanHistoryModel } = require('../models/FlyplanHistory.Model.ts');

async function getHistory(req: Request, res: express.Response) {
    try {
        const { title } = req.body;
        const flyplan = await FlyPlanModel.findOne({ title, userId: req.user.id });
        if (!flyplan) return responseApi.errorResponse(res, errors.noOnePlan.code, errors.noOnePlan.message);
        const history = await FlyplanHistoryModel.find({ flyplanId: flyplan.id, userId: req.user.id });
        if (history.length === 0) return responseApi.errorResponse(res, errors.NoHistoryPlan.code, errors.NoHistoryPlan.message);
        return responseApi.successResponseWithData(res, {
            message: 'success',
            history,
        });
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function addHistory(req: Request, res: express.Response) {
    try {
        const { title, data } = req.body;
        if (!title || !data) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        const flyPlan = await FlyPlanModel.findOne({
            userId: req.user.id,
            title: req.body.title,
        });
        const idHistory = await FlyplanHistoryModel.find({ flyplanId: flyPlan.id });
        const history = new FlyplanHistoryModel({
            flyplanId: flyPlan.id,
            data,
            titleParent: flyPlan.title,
            userId: req.user.id,
            id: idHistory.length !== 0 ? idHistory[idHistory.length - 1].id + 1 : 0,
        });
        const { dataPlan = data, titleParent, id } = await history.save();
        return responseApi.successResponseWithData(res, {
            message: 'History saved.',
            data: dataPlan,
            titleParent,
            id,
        });
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function addPlan(req: Request, res: express.Response) {
    try {
        let isPublic = false;
        if (!req.body.title || !req.body.data || typeof req.body.data !== 'string') {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        if (req.body.isPublic === true) isPublic = true;
        const checkExistingPlan = await FlyPlanModel.findOne({
            userId: req.user.id,
            title: req.body.title,
        });
        if (checkExistingPlan) {
            return responseApi.errorResponse(res,
                errors.planAlreadyExist.code,
                errors.planAlreadyExist.message);
        }

        const plan = new FlyPlanModel({
            userId: req.user.id,
            title: req.body.title,
            isPublic,
            data: req.body.data,
        });
        await plan.save();
        return responseApi.successResponse(res, 'Success');
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function removePlan(req: Request, res: express.Response) {
    try {
        if (!req.body.remove) {
            return responseApi.errorResponse(
                res,
                errors.removeMissing.code,
                errors.removeMissing.message,
            );
        }
        const search = await FlyPlanModel.deleteOne({ title: req.body.remove, userId: req.user.id });
        if (search.deletedCount < 1) {
            return responseApi.errorResponse(res, // aucune recherche de ce type exite
                errors.missingPlan.code,
                errors.missingPlan.message);
        }
        return responseApi.successResponse(res, 'your search has been deleted');
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function getPlan(req: Request, res: express.Response) {
    try {
        const list = await FlyPlanModel.findOne({ userId: req.user.id, title: req.body.title });
        if (!req.body.title) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        if (!list) {
            return responseApi.errorResponse(res, errors.noOnePlan.code, errors.noOnePlan.message);
        }
        return responseApi.successResponseWithData(res, list);
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function getAllPlan(req: Request, res: express.Response) {
    try {
        const list = await FlyPlanModel.find({ userId: req.user.id });
        if (list.length >= 1) return responseApi.successResponseWithData(res, list);
        return responseApi.errorResponse(res, errors.noOnePlan.error, errors.noOnePlan.message);
    } catch (e) {
        return responseApi.internError(res, e);
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

exports.getHistory = [
    authMiddlewares.checkUser,
    getHistory,
];
