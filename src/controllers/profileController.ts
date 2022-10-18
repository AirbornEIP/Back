import express from 'express';
import type { Request } from './Type';

const { UserModel } = require('../models/User.Model.ts');
const authMiddlewares = require('../middlewares/auth.ts');
const apiResponse = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const responseApi = require('../helpers/apiResponse');

async function getProfile(req: Request, res: express.Response) {
    const { user } = req;
    return apiResponse.successResponseWithData(res, user);
}

async function editProfile(req: Request, res: express.Response) {
    try {
        const { name, surname } = req.body;
        const filter = { email: req.user.email };
        // eslint-disable-next-line no-unused-expressions
        (name && name !== req.user.name ? req.user.name = name : 0);
        // eslint-disable-next-line no-unused-expressions
        (surname && surname !== req.user.surname ? req.user.surname = name : 0);
        await UserModel.findOneAndUpdate(filter, req.user);
        return apiResponse.successResponse(res, 'Profile Updated');
    } catch (e) {
        return apiResponse.internError(res, e);
    }
}

async function uploadAvatar(req: Request, res: express.Response) {
    try {
        const { avatar } = req.body;
        if (!avatar) {
            return apiResponse.errorResponse(res, errors.formMissing.code, errors.formMissing.message);
        }
        await UserModel.findOneAndUpdate({ email: req.user.email }, { avatar });
        return apiResponse.successResponse(res, 'avatar saved');
    } catch (e) {
        return apiResponse.internError(res, e);
    }
}

async function banUser(req: Request, res: express.Response) {
    try {
        if (!req.body.email || req.body.status === 'undefined') {
            return (responseApi.errorResponse(res, 13, 'email or status not found'));
        }
        if (typeof req.body.status !== 'boolean') {
            return (responseApi.errorResponse(res, 14, 'status is not a boolean'));
        }
        if (req.user.admin === true) {
            await UserModel.findOneAndUpdate({ email: req.body.email }, { banned: req.body.status });
            return responseApi.successResponse(res, req.body.status === true ? 'User are banned' : 'User are unbanned');
        }
        return (responseApi.errorResponse(res, 12, 'User are not an admin'));
    } catch (e) {
        return apiResponse.internError(res, e);
    }
}

async function changeTheme(req: Request, res: express.Response) {
    try {
        const { theme } = req.body;

        if (theme === undefined || typeof theme !== typeof true) {
            return responseApi.errorResponse(res, errors.errors.formMissing.code, errors.errors.formMissing.message);
        }
        await UserModel.findOneAndUpdate({ email: req.user.email }, { theme });
        return apiResponse.successResponse(res, 'Theme Updated');
    } catch (e) {
        return apiResponse.internError(res, e);
    }
}

async function getTheme(req: Request, res: express.Response) {
    try {
        return apiResponse.successResponseWithData(res, req.user.theme);
    } catch (e) {
        return apiResponse.internError(res, e);
    }
}

exports.getProfile = [
    authMiddlewares.checkUser,
    getProfile,
];

exports.editProfile = [
    authMiddlewares.checkUser,
    editProfile,
];

exports.changeTheme = [
    authMiddlewares.checkUser,
    changeTheme,
];

exports.getTheme = [
    authMiddlewares.checkUser,
    getTheme,
];

exports.uploadAvatar = [
    authMiddlewares.checkUser,
    uploadAvatar,
];

exports.banUser = [
    authMiddlewares.checkUser,
    banUser,
];
