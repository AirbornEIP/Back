const responseApi = require("../helpers/apiResponse")
const {errors} = require("../helpers/constant");
const flyPlan = require("../models/FlyPlan.Model");

 exports.addPlan = async function (req, res) {
     let isPublic = false
    if (!req.body.title  || !req.body.data ) {
        return responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message)
    }
    if (req.body.isPublic === true)
        isPublic = true
    const checkExistingPlan = await flyPlan.findOne({userId: req.user.id, title: req.body.title})
    if (checkExistingPlan) {
        return responseApi.errorResponse(res, errors.planAlreadyExist.code, errors.planAlreadyExist.message)
    }
    const plan = new flyPlan({
        userId: req.user.id,
        title: req.body.title,
        isPublic: isPublic,
        data:  req.body.data
    });
    plan.save()
    return responseApi.successResponse(res, "Success");
}

exports.removePlan = async function (req, res) {
    if (!req.body.remove) {
        return responseApi.errorResponse(res, errors.removeMissing.code, errors.removeMissing.message)
    }
    const search = await flyPlan.deleteOne({title: req.body.remove, userId: req.user.id})
    if (search.deletedCount < 1) {
        return responseApi.errorResponse(res, errors.missingPlan.code, errors.missingPlan.message) // aucune recherche de ce type exite
    } else {
        return responseApi.successResponse(res, "your search has been deleted")
    }
}

exports.getPlan = async function (req, res) {
    let list = await flyPlan.findOne({userId: req.user.id, title: req.body.title})
    if (!req.body.title) {
      return   responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message)
    }
    if (list)
        return responseApi.successResponseWithData(res, "Success", list)
    else
        return responseApi.errorResponse(res, errors.noOnePlan.code, errors.noOnePlan.message)
}

exports.getAllPlan = async function (req, res) {
    let list = await flyPlan.find({userId: req.user.id})
    if (list.length >= 1)
        return responseApi.successResponseWithData(res, "Success", list)
    else
        return responseApi.errorResponse(res, errors.noOnePlan.error, errors.noOnePlan.message)
}

