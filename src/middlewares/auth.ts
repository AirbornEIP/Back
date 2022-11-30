import jwt from 'express-jwt';
import type express from 'express';
import type { Request } from '../controllers/Type';

const responseApi = require('../helpers/apiResponse.ts');
const { errorMessages } = require('../helpers/constants.ts');

const dotenv = require('dotenv');
const { UserModel } = require('../models/User.Model.ts');

dotenv.config({ path: `.env.${process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development'}` });
const secret = process.env.JWT_SECRET;

async function checkUserExists(req: Request, res: express.Response, next: express.NextFunction) {
    try {
        const user = await UserModel.findOne({ _id: req.user._id });
        if (!user) {
            return responseApi.unauthorizedResponse(res, errorMessages.userNoExist);
        }
        if (user.isBan()) {
            return responseApi.unauthorizedResponse(res, errorMessages.bannedUser);
        }
        req.user = user;
        return next();
    } catch (e) {
        return responseApi.internError(res, e);
    }
}

async function isAdmin(req: Request, res: express.Response, next: express.NextFunction) {
    if (req.user.admin === false) {
        return responseApi.internError(res, 'This account are not an admin');
    }
    return next();
}

async function checkValidationEmail(req: Request, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.user) {
            return responseApi.unauthorizedResponse(res, errorMessages.emailNotVerified);
        }
        return next();
    } catch (e) {
        return responseApi.internError(res, e);
    }
}
exports.checkUser = [
    jwt({ secret, algorithms: ['HS256'] }),
    checkUserExists,
];

exports.checkValidationEmail = [
    checkValidationEmail,
];

exports.isAdmin = [
    isAdmin,
];
