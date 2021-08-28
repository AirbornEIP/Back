const authMiddlewares = require('../middlewares/auth');
const apiResponse = require('../helpers/apiResponse');
const UserModel = require('../models/UserModel');
const errors = require('../helpers/constants');
const responseApi = require('../helpers/apiResponse');

async function getProfile(req, res) {
    const { user } = req;
    return apiResponse.successResponseWithData(res, user);
}

async function editProfile(req, res) {
    try {
        const { name, surname, username } = req.body;
        const filter = { email: req.user.email };

        (name ? req.user.name = name : 0);
        (username ? req.user.username = name : 0);
        (surname ? req.user.surname = name : 0);

        await UserModel.findOneAndUpdate(filter, req.user);
        return apiResponse.successResponse(res, 'Profile Updated');
    } catch (e) {
        // eslint-disable-next-line max-len
        return apiResponse.errorResponse(res, errors.interneError.code, errors.interneError.message());
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
        return apiResponse.errorResponse(res, errors.interneError.code, errors.interneError.message());
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
