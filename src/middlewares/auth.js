const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;

const UserModel = require("../models/UserModel");
const apiResponse = require("../helpers/apiResponse");

const {errorMessages} = require("../helpers/constants");

async function checkUserExists(req, res, next) {
    try {
    const user = await UserModel.findOne({_id: req.user._id});
    if (!user) {
        return apiResponse.unauthorizedResponse(res, errorMessages.unknownUser);
    } else if (user.isBan()) {
        return apiResponse.unauthorizedResponse(res, errorMessages.bannedUser);
    }

    req.user = user

    next();
    } catch(e) {
        console.log(e)
    }
}
exports.checkUser = [
    jwt({secret, algorithms: ['HS256']}),
    checkUserExists
]
