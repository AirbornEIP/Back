import type express from 'express';
import type { Request } from './Type';

const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const feedback = require('../models/FeedBack.Model.ts');
const authMiddlewares = require('../middlewares/auth.ts');

async function get(req: Request, res: express.Response) {
    try {
        const id = req.query;
        // eslint-disable-next-line max-len
        if (!id) return responseApi.errorResponse(res, errors.queryMissing.code, errors.queryMissing.message);
        const feedsback = await feedback.find({ userId: req.user.id });
        if (!feedsback) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.userNoData.code, errors.userNoData.message);
        }
        return responseApi.successResponseWithData(res, feedsback);
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function getAll(req: Request, res: express.Response) {
    try {
        const feedsback = await feedback.find();
        if (!feedsback) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.userNoData.code, errors.userNoData.message);
        }
        return responseApi.successResponseWithData(res, feedsback);
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function post(req: Request, res: express.Response) {
    try {
        const { message, title } = req.body;
        // eslint-disable-next-line max-len
        if (!title || !message) return responseApi.errorResponse(res, errors.formMissing.code, errors.formMissing.message);
        // eslint-disable-next-line new-cap
        const feed = new feedback({
            title,
            userId: req.user.id,
            surname: req.user.surname,
            name: req.user.name,
            email: req.user.email,
            text: message,
        });
        const {
            name, surname, email, text,
        } = await feed.save();
        return responseApi.successResponseWithData(res, {
            message: 'Feedback saved.',
            data: {
                title,
                name,
                surname,
                email,
                text,
            },
        });
    } catch (e) {
        return responseApi.internError(res, e);
    }
}
exports.get = [
    authMiddlewares.checkUser,
    get,
];

exports.post = [
    authMiddlewares.checkUser,
    post,
];

exports.getAll = [
    getAll,
];
