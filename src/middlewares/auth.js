const jwt = require('express-jwt');

const secret = process.env.JWT_SECRET;

const UserModel = require('../models/UserModel');
const apiResponse = require('../helpers/apiResponse');

const { errorMessages } = require('../helpers/constants');

// eslint-disable-next-line consistent-return
async function checkUserExists(req, res, next) {
    try {
        // eslint-disable-next-line no-underscore-dangle
        const user = await UserModel.findOne({ _id: req.user._id });
        if (!user) {
            return apiResponse.unauthorizedResponse(res, errorMessages.userNoExist);
        } if (user.isBan()) {
            return apiResponse.unauthorizedResponse(res, errorMessages.bannedUser);
        }

        req.user = user;

        next();
    } catch (e) {
        console.log(e);
    }
}
exports.checkUser = [
    jwt({ secret, algorithms: ['HS256'] }),
    checkUserExists,
];
