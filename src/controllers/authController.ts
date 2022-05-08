/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import fetch from 'node-fetch';
import qs from 'qs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import type express from 'express';
// eslint-disable-next-line import/extensions
import UserModel from '../models/User.Model';
import ConfirmEmailModel from '../models/ConfirmationMail.model';
// eslint-disable-next-line import/extensions
import * as validationMiddlewares from '../middlewares/validation';
// eslint-disable-next-line import/no-duplicates
import apiResponse from '../helpers/apiResponse';
import ForgotPassword from '../models/ForgotPassword';
import utility from '../helpers/utility';
import { errorMessages, validationMessages, errors } from '../helpers/constants';
// eslint-disable-next-line import/no-duplicates
import responseApi from '../helpers/apiResponse';
import { mailer } from '../helpers/mailer';
// import { checkValidationEmail } from '../../middlewares/auth';
// import { checkValidation } from '../middlewares/validation';

async function registerRequest(req: express.Request, res: express.Response) {
    try {
        const {
            email, password, username, surname, name,
        } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const uuid = uuidv4();
        if (!email || !password || !username || !surname || !name) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.formMissing.code, errors.formMissing.message);
        }

        const user = new UserModel({
            email,
            password: hash,
            username,
            surname,
            name,
        });
        const saveUser = await user.save();
        const ConfirmEmail = new ConfirmEmailModel({ UserId: saveUser._id, uuid, email });
        await ConfirmEmail.save();
        // await mailer(`http://localhost:8080${uuid}`, 'Confirm your email', req.body.email);
        const jwtToken = utility.generateJwtToken(saveUser._id, saveUser.email);

        return apiResponse.successResponseWithData(res, {
            jwtToken,
            profile: {
                id: saveUser._id,
                email,
                username,
                name,
                surname,
            },
        });
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

// eslint-disable-next-line consistent-return
async function confirmEmail(req: express.Request, res: express.Response) {
    try {
        const { uuid } = req.body;

        if (!uuid) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.formMissing.code, errors.formMissing.message);
        }
        const confMail = await ConfirmEmailModel.findOne({ uuid });
        if (confMail) {
            await UserModel.findOneAndUpdate({ _id: confMail.UserId }, { verifiedEmail: true });
            await ConfirmEmailModel.findOneAndDelete({ uuid });
            await mailer('Your account has been created', 'Account Airborn created', req.body.email);
            return responseApi.successResponse(res, 'Email confirmed');
        }
        // eslint-disable-next-line max-len
        return responseApi.errorResponse(res, errors.emailNotConfirmed.code, errors.emailNotConfirmed.message);
    } catch (e) {
        console.log(e);
    }
}

async function loginRequest(req: express.Request, res: express.Response) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return apiResponse.unauthorizedResponse(res, errorMessages.wrongCredentials);
        }
        console.log(password);
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
            return apiResponse.unauthorizedResponse(res, errorMessages.wrongCredentials);
        }
        if (user.isBan()) {
            return apiResponse.unauthorizedResponse(res, errorMessages.bannedUser);
        }

        const jwtToken = utility.generateJwtToken(user._id, user.email);

        return apiResponse.successResponseWithData(res, {
            jwtToken,
            profile: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function registerGoogle(req: express.Request, res: express.Response) {
    try {
        const code = decodeURIComponent(req.body.code);
        if (!code) {
            return apiResponse.errorResponse(res, 0, errorMessages.invalidToken);
        }
        const params = {
            code,
            client_id: '981541357136-ufmit25u5r3uq96s98quvltpsam99k74.apps.googleusercontent.com',
            client_secret: 'S8fUS5IvZEiXJT_xvP6XYxyl',
            access_type: 'offline',
            redirect_uri: 'http://0.0.0.0:8080/loginGoogle',
            grant_type: 'authorization_code',
        };
        const t = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            // eslint-disable-next-line no-undef
            body: qs.stringify(params),
        });
        const json = await t.json();
        console.log(json);
        return responseApi.successResponse(res, json);
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function changePassword(req: express.Request, res: express.Response) {
    try {
        const { uuid } = req.body;
        const { password } = req.body;
        const UserPassword = await ForgotPassword.findOne({ uuid });
        const hash = await bcrypt.hash(password, 10);

        if (!UserPassword) {
            return responseApi.errorResponse(
                res,
                errors.unknownUser.code,
                errors.unknownUser.message,
            );
        }
        const id = UserPassword.UserId;
        // eslint-disable-next-line max-len
        const user = await UserModel.findOneAndUpdate({ _id: id }, { password: hash, updateAt: Date.now });
        if (user) {
            await ForgotPassword.findOneAndDelete(uuid);
            return responseApi.successResponse(res, 'Password has been updated');
        }
        return responseApi.errorResponse(res, errors.userNoExist.code, errors.userNoExist.message);
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(res, e);
    }
}

async function forgotPassword(req: express.Request, res: express.Response) {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        const uuid = uuidv4();
        if (!user) {
            return responseApi.errorResponse(
                res,
                errors.unknownUser.code,
                errors.unknownUser.message,
            );
        }
        await mailer(`http://0.0.0.0:3000/reset?${uuid}`, 'Forgot Password Airborn', email);
        // eslint-disable-next-line max-len
        const modelForgotPassword = new ForgotPassword({ UserId: user._id, uuid, createdAt: Date.now });
        await modelForgotPassword.save();
        return responseApi.successResponse(res, 'Email sent');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}
//
// async function validEmail(req: express.Request, res: express.Response) {
//
//
//
//
// }

exports.register = [
    body('email')
        .isLength({ min: 1 }).trim().withMessage(validationMessages.emailMissing)
        .isEmail()
        .withMessage(validationMessages.emailInvalid),
    body('password')
        .isLength({ min: 6 }).trim().withMessage(validationMessages.passwordInvalid),
    validationMiddlewares.checkEmailDuplication,
    validationMiddlewares.checkValidation,
    registerRequest,
];

exports.login = [
    body('email')
        .isEmail().withMessage(validationMessages.emailInvalid),
    body('password')
        .isLength({ min: 1 }).withMessage(validationMessages.passwordMissing),
    validationMiddlewares.checkValidation,
    loginRequest,
];

exports.forgotPassword = [
    forgotPassword,
];

exports.changePassword = [
    changePassword,
];

exports.registerGoogle = [
    registerGoogle,
];

exports.confirmEmail = [
    confirmEmail,
];

// exports.validEmail = [
//     validEmail,
// ];
