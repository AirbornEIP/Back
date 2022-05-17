// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import UserModel from '../models/User.Model';

// eslint-disable-next-line import/extensions
const authMiddlewares = require('../middlewares/auth');
const apiResponse = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const responseApi = require('../helpers/apiResponse');

async function getProfile(req, res) {
    const { user } = req;
    return apiResponse.successResponseWithData(res, user);
}

async function editProfile(req, res) {
    try {
        const { name, surname, username } = req.body;
        const filter = { email: req.user.email };
        // eslint-disable-next-line no-unused-expressions
        (name && name !== req.user.name ? req.user.name = name : 0);
        // eslint-disable-next-line no-unused-expressions
        (username && username !== req.user.username ? req.user.username = name : 0);
        // eslint-disable-next-line no-unused-expressions
        (surname && surname !== req.user.surname ? req.user.surname = name : 0);
        await UserModel.findOneAndUpdate(filter, req.user);
        return apiResponse.successResponse(res, 'Profile Updated');
    } catch (e) {
        // eslint-disable-next-line max-len
        console.log(e);
        // eslint-disable-next-line max-len
        return apiResponse.errorResponse(res, errors.interneError.code, errors.interneError.message);
    }
}

async function uploadAvatar(req, res) {
    try {
        const { avatar } = req.body;
        if (!avatar) {
            // eslint-disable-next-line max-len
            return apiResponse.errorResponse(res, errors.missArgument.code, errors.missArgument.message);
        }
        await UserModel.findOneAndUpdate({ email: req.user.email }, { avatar });
        return apiResponse.successResponse(res, 'avatar saved');
    } catch (e) {
        // eslint-disable-next-line max-len
        return apiResponse.errorResponse(res, errors.interneError.code, errors.interneError.message);
    }
}

// eslint-disable-next-line consistent-return
async function banUser(req, res) {
    try {
        if (!req.body.email || req.body.status === 'undefined') {
            return (responseApi.errorResponse(res, 13, 'email or status not found'));
        }

        if (typeof req.body.status !== 'boolean') {
            return (responseApi.errorResponse(res, 14, 'status is not a boolean'));
        }
        if (req.user.admin === true) {
            // eslint-disable-next-line max-len
            await UserModel.findOneAndUpdate({ email: req.body.email }, { banned: req.body.status });
            return responseApi.successResponse(res, req.body.status === true ? 'User are banned' : 'User are unbanned');
        }
        return (responseApi.errorResponse(res, 12, 'User are not an admin'));
    } catch (e) {
        console.log(e);
    }
}

// eslint-disable-next-line consistent-return
async function changeTheme(req, res) {
    try {
        const { theme } = req.body;

        if (theme === undefined || typeof theme !== typeof true) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.errors.formMissing.code, errors.errors.formMissing.message);
        }
        await UserModel.findOneAndUpdate({ email: req.user.email }, { theme });
        return apiResponse.successResponse(res, 'Theme Updated');
    } catch (e) {
        // eslint-disable-next-line max-len
        return apiResponse.errorResponse(res, errors.errors.interneError.code, errors.errors.interneError.message);
    }
}

async function getTheme(req, res) {
    try {
        return apiResponse.successResponseWithData(res, req.user.theme);
    } catch (e) {
        // eslint-disable-next-line max-len
        return apiResponse.errorResponse(res, errors.errors.interneError.code, errors.errors.interneError.message);
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
