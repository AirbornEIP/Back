const authMiddlewares = require("../middlewares/auth");
const apiResponse = require("../helpers/apiResponse");

exports.getProfile = [
    authMiddlewares.checkUser,
    getProfile
];

async function getProfile(req, res) {
    const user = req.user
    return apiResponse.successResponseWithData(res, user)
}
