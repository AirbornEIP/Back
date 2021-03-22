const validToken = require('../midleware/validToken')
const flyPlan = require('../controllers/flyPlanController')

exports.add = [
    validToken.checkValidAccessToken,
    flyPlan.addPlan
];
exports.remove = [
    validToken.checkValidAccessToken,
    flyPlan.removePlan
]

exports.get = [
    validToken.checkValidAccessToken,
    flyPlan.getPlan
]

exports.getAll = [
    validToken.checkValidAccessToken,
    flyPlan.getAllPlan
]
