const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const feedback = require('../models/FeedBack.Model');
const authMiddlewares = require('../middlewares/auth');

// eslint-disable-next-line consistent-return
async function get(req, res) {
    try {
        const id = req.query;
        console.log(req.query);
        // eslint-disable-next-line max-len
        if (!id) return responseApi.errorResponse(res, errors.queryMissing.code, errors.queryMissing.message);
        const feedsback = await feedback.find({ userId: req.query.id });
        if (!feedsback) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.userNoData.code, errors.userNoData.message);
        }
        return responseApi.successResponseWithData(res, feedsback);
    } catch (e) {
        responseApi.errorResponse(res, errors.interneError.code, errors.interneError.message);
    }
}

// eslint-disable-next-line consistent-return
async function getAll(req, res) {
    try {
        const feedsback = await feedback.find();
        if (!feedsback) {
            // eslint-disable-next-line max-len
            return responseApi.errorResponse(res, errors.userNoData.code, errors.userNoData.message);
        }
        return responseApi.successResponseWithData(res, feedsback);
    } catch (e) {
        responseApi.errorResponse(res, errors.interneError.code, errors.interneError.message);
    }
}

// eslint-disable-next-line consistent-return
async function post(req, res) {
    const { message, title } = req.body;
    if (!title || !message) {
        // eslint-disable-next-line max-len
        return responseApi.errorResponse(res, errors.formMissing.code, errors.formMissing.message);
    }
    // eslint-disable-next-line new-cap
    const feed = new feedback({
        title,
        userId: req.user.id,
        text: message,
    });
    await feed.save();

    return responseApi.successResponse(res, 'Feedback saved.');

}
exports.get = [
    authMiddlewares.checkUser,
    get,
];

exports.post = [
    authMiddlewares.checkUser,
    post,
];

exports.getAll = [
    getAll,
];
