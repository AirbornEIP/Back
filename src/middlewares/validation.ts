import { validationResult } from 'express-validator';
import type express from 'express';
// eslint-disable-next-line import/extensions
import UserModel from '../models/User.Model';
import apiResponse from '../helpers/apiResponse';
import { errorMessages } from '../helpers/constants';

// eslint-disable-next-line consistent-return,max-len
export const checkEmailDuplication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return apiResponse.validationError(res, errorMessages.emailDuplication);
    }
    next();
};

// eslint-disable-next-line consistent-return,max-len
export const checkValidation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errorsData = validationResult(req);
    if (!errorsData.isEmpty()) {
        return apiResponse.validationErrorWithData(
            res,
            errorMessages.validationError,
            errorsData.array(),
        );
    }
    next();
};
