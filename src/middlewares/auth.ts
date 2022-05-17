import jwt from 'express-jwt';
import type express from 'express';
// eslint-disable-next-line import/extensions
import UserModel from '../models/User.Model';
import apiResponse from '../helpers/apiResponse';
import { errorMessages } from '../helpers/constants';

const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development'}` });
const secret = process.env.JWT_SECRET;
console.log('test');
// eslint-disable-next-line consistent-return,max-len
async function checkUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        // eslint-disable-next-line no-underscore-dangle
        const user = await UserModel.findOne({ _id: req.user._id });
        if (!user) {
            return apiResponse.unauthorizedResponse(res, errorMessages.userNoExist);
        }
        if (user.isBan()) {
            return apiResponse.unauthorizedResponse(res, errorMessages.bannedUser);
        }
        req.user = user;
        return next();
    } catch (e) {
        console.log(e);
    }
}

// eslint-disable-next-line max-len,consistent-return
async function checkValidationEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.user) {
            return apiResponse.unauthorizedResponse(res, errorMessages.emailNotVerified);
        }
        return next();
    } catch (e) {
        console.log(e);
    }
}
exports.checkUser = [
    jwt({ secret, algorithms: ['HS256'] }),
    checkUserExists,
];

exports.checkValidationEmail = [
    checkValidationEmail,
];

