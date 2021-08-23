const { validationResult } = require('express-validator');

const UserModel = require('../models/UserModel');
const apiResponse = require('../helpers/apiResponse');
const { errorMessages } = require('../helpers/constants');

exports.checkEmailDuplication = async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return apiResponse.validationError(res, errorMessages.emailDuplication);
    }
    return next();
};

exports.checkValidation = (req, res, next) => {
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
