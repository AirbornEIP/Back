const validToken = require("./validToken")
const proxy = require('../controllers/proxy')

exports.metar = [
    validToken.checkValidAccessToken,
    proxy.metarCall
];

