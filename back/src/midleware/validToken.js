const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const {errors} = require("../helpers/constant");
const responseApi = require("../helpers/apiResponse")
const secretToken = "57c0e0c9d9a6019c4d4b1e8643890c265739b58729b59502aaec2cb4d43fdff6707815f8e1718b847203d590be1c3f8c2500ab27b37ff3a6e19a6307043ee8a7"


exports.checkScriptToken = async function (req, res, next) {
    const authHeader = req.headers['scripttoken']
    if (!authHeader || authHeader !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhpZXUudGVyY2FuZkBlcGl0ZWNoLmV1IiwiaWQiOiI1ZmNmZDQ2MmFmOGFkZjAxYTFiY2QzMDMiLCJ1c2VybmFtZSI6Ik1hdGhpZXU5NCIsImlhdCI6MTYwNzQ2MTM1M30.2LTHyRwj2dZRkyAFiz2xVag3LF_Lt8kivPiqh-zWKNA') {
        return  responseApi.errorResponse(res, errors.wrongJwt.code, "Invalid token")
    }
    else {
        next()
    }
}

exports.checkValidAccessToken = async function(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return responseApi.errorResponse(res, errors.wrongJwt.code, "Invalid token")
    }
    let ok = jwt.verify(token, secretToken, (err, user) => {
        if (err) {
            console.log(err)
            return 84
        }
        req.user = user
        return 0
    })
    if (ok === 84)
        return responseApi.errorResponse(res, errors.wrongJwt.code, "Invalid token")
    let exist = await User.exists({email: req.user.email})
    if (exist === false) {
        return responseApi.errorResponse(res, errors.wrongJwt.code, "Invalid token")
    }
    next()
}
