import { validationResult } from 'express-validator';
import type express from 'express';
import apiResponse from '../helpers/apiResponse';
import { errorMessages } from '../helpers/constants';

const { UserModel } = require('../models/User.Model.ts');

export const checkEmailDuplication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return apiResponse.validationError(res, errorMessages.emailDuplication);
    }
    return next();
};

export const checkValidation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errorsData = validationResult(req);
    if (!errorsData.isEmpty()) {
        return apiResponse.validationErrorWithData(
            res,
            errorMessages.validationError,
            errorsData.array(),
        );
    }
    return next();
};
