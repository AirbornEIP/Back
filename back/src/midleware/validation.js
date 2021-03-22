const UserModel = require("../models/UserModel");
const apiResponse = require("../helpers/apiResponse");
const {validationResult} = require("express-validator");
const {errors} = require("../helpers/constant");

exports.checkEmailDuplication = async function(req, res, next) {
    const user = await UserModel.findOne({email: req.body.email});
    if (user) {
        return apiResponse.validationError(res, errors.emailDuplication.code, errors.emailDuplication.message);
    }
    next();
};

exports.checkValidation = function(req, res, next) {
    const errorsData = validationResult(req);
    if (!errorsData.isEmpty()) {
        return apiResponse.validationErrorWithData(res, errors.validationError.code, errors.validationError.message, errorsData.array());
    }
    next();
};

exports.checkValideUsername = function (req, res, next) {
    if (!req.body.username) {
        return apiResponse.validationError(res, errors.usernameMissing.code, errors.usernameMissing.message)
    }
    next()
}
