const responseApi = require("../helpers/apiResponse")
const {errors} = require("../helpers/constant");
const Vac = require("../models/VacPlan.Model");


exports.get = async function(req, res) {
    let filter = {name: req.body.airport}
    let vac = await Vac.findOne(filter)
    if (!vac) {
        responseApi.errorResponse(res, errors.wrongAirport.code, errors.wrongAirport.message)
    } else {
        responseApi.successResponseWithData(res, "Success", vac.link)
    }
}

exports.update = async function (req, res) {
    if (!req.body.data) {
        responseApi.errorResponse(res, errors.wrongBody.code, errors.wrongBody.message)
    }
    let jsons = req.body.data
    let vac;
    let filter = {}
    let update = {}
    for (let i = 0; jsons[i]; i++) {
        filter = {name: jsons[i].name}
        update = {link: jsons[i].link}
        vac = await Vac.findOneAndUpdate(filter, update)
        if (!vac) {
            vac = new Vac({name: jsons[i].name, link: jsons[i].link});
            vac.save()
        }
    }
    responseApi.successResponse(res,'Plan has been updated')
}
