const responseApi = require('../helpers/apiResponse');
const { errors } = require('../helpers/constants');
const imageDocument = require('../models/imageDocument.Model');
const authMiddlewares = require('../middlewares/auth');

async function addImage(req, res) {
    try {
        if (!req.body.title || !req.body.imageURL || !req.body.id || !req.user.id) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        if (checkExistingPlan) {
            return responseApi.errorResponse(res,
                errors.planAlreadyExist.code,
                errors.planAlreadyExist.message);
        }
        const checkExistingPlan = await flyPlan.findOne({
            userId: req.user.id,
            title: req.body.title,
        });
        const imageDoc = new imageDocument({
            authorId: req.user.id,
            title: req.body.title,
            isPublic: true,
            imageURL: req.body.data,
        });
        imageDoc.save();
        return responseApi.successResponse(res, 'Success');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function removeImage(req, res) {
    try {
        if (!req.body.remove || !req.user.id) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        const search = await flyPlan.deleteOne({ title: req.body.remove, userId: req.user.id });
        if (search.deletedCount < 1) {
            return responseApi.errorResponse(res,
                errors.missingPlan.code,
                errors.missingPlan.message);
        }
        return responseApi.successResponse(res, 'the image has succesfully been deleted');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}

async function getImage(req, res) {
    try {
        if ((!req.body.title && !req.body.imageURL && !req.body.id) || !req.user.id) {
            return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message);
        }
        const { title, imageURL, id } = req.body;
        let searchExistingImage = false;
        if (title) {
            searchExistingImage = await flyPlan.findOne({ title: title, authorId: req.user.id });
        }
        else if (imageURL) {
            searchExistingImage = await flyPlan.findOne({ title: req.body.remove, userId: req.user.id });
        }
        else if (id) {
            searchExistingImage = await flyPlan.findOne({ title: req.body.remove, userId: req.user.id });
        }
        if (!searchExistingImage) {
            return responseApi.errorResponse(res,
                errors.planAlreadyExist.code,
                errors.planAlreadyExist.message);
        }
        return responseApi.successResponse(res, 'Success');
    } catch (e) {
        console.log(e);
        return responseApi.errorResponse(
            res,
            errors.interneError.code,
            errors.interneError.message,
        );
    }
}


exports.add = [
    authMiddlewares.checkUser,
    addImage,
];

exports.get = [
    authMiddlewares.checkUser,
    getImage,
];

exports.delete = [
    authMiddlewares.checkUser,
    removeImage,
];
