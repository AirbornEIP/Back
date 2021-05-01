const validToken = require('../midleware/validToken')
const vac = require('../controllers/vacController')

exports.update = [
    validToken.checkScriptToken,
    vac.update
]

exports.get = [
    validToken.checkValidAccessToken,
    vac.get
]
