const authMiddlewares = require('../middlewares/auth')
const responseApi = require("../helpers/apiResponse")
const {errors} = require("../helpers/constants");
const Vac = require("../models/VacPlan.Model");

exports.update = [
    authMiddlewares.checkUser,
    update
]

exports.get = [
    authMiddlewares.checkUser,
    get
]




async function get (req, res) {
    try {
    let filter = {name: req.body.airport}
    let vac = await Vac.findOne(filter)
    if (!vac) {
        responseApi.errorResponse(res, errors.wrongAirport.code, errors.wrongAirport.message)
    } else {
        responseApi.successResponseWithData(res, "Success", vac.link)
    }
    }catch(e) {
        console.log(e)
    }
}

async function update (req, res) {
    try {
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
    } catch(e) {
        console.log(e)
    }
}
