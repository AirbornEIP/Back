const authMiddlewares = require('../middlewares/auth');
const apiResponse = require('../helpers/apiResponse');

async function getProfile(req, res) {
    const { user } = req;
    return apiResponse.successResponseWithData(res, user);
}

exports.getProfile = [
    authMiddlewares.checkUser,
    getProfile,
];
