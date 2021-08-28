const { validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');
const apiResponse = require('../helpers/apiResponse');
const { errorMessages } = require('../helpers/constants');

// eslint-disable-next-line consistent-return
exports.checkEmailDuplication = async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return apiResponse.validationError(res, errorMessages.emailDuplication);
    }
    next();
};

// eslint-disable-next-line consistent-return
exports.checkValidation = (req, res, next) => {
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
