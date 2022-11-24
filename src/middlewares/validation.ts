import { validationResult } from 'express-validator';
import type express from 'express';

const apiResponse = require('../helpers/apiResponse.ts');

const { errorMessages } = require('../helpers/constants.ts');
const { UserModel } = require('../models/User.Model.ts');

export const checkEmailDuplication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return apiResponse.validationError(res, errorMessages.emailDuplication);
        }
        return next();
    } catch (e) {
        return apiResponse.internError(res, e);
    }
};

export const checkValidation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const errorsData = validationResult(req);
        if (!errorsData.isEmpty()) {
            return apiResponse.validationErrorWithData(
                res,
                errorMessages.validationError,
                errorsData.array(),
            );
        }
        return next();
    } catch (e) {
        return apiResponse.internError(res, e);
    }
};
