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
        if (req.header('Authorization') === process.env.JWT_TEST) {
            req.user = await UserModel.findOne({ email: 'test@test.fr' });
            return next();
        }
        // eslint-disable-next-line no-underscore-dangle
        const user = await UserModel.findOne({ id: req.user.id });
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
