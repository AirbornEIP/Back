const secretToken = "57c0e0c9d9a6019c4d4b1e8643890c265739b58729b59502aaec2cb4d43fdff6707815f8e1718b847203d590be1c3f8c2500ab27b37ff3a6e19a6307043ee8a7"
const responseApi = require("../helpers/apiResponse")
const {errors} = require("../helpers/constant");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res) {
    try {
        let exist = await User.exists({email: req.body.email})
        if (exist === true) {
            let user = await User.findOne({email: req.body.email})
            if (user.password === req.body.password) {
                let find = await User.findOne({email: req.body.email})
                const accessToken = jwt.sign({
                    email: req.body.email,
                    id: find._id,
                    username: req.body.username
                }, secretToken)
                return (responseApi.successResponseWithData(res, "Success",{accessToken}))
            } else {
                return responseApi.errorResponse(res, errors.wrongCredentials.code, errors.wrongCredentials.message)
            }
        } else {
            return responseApi.errorResponse(res, errors.unknownUser.code, errors.unknownUser.message)
        }
    } catch (e) {
        console.log(e)
    }
}

exports.register = async function (req, res) {
      User.exists({email: req.body.email}, async function (err, result) {
        if (err) {
            return res.send(err, 500);
        } else {
            if (result === false) {
                const user = new User({email: req.body.email, password: req.body.password, username: req.body.username});
                await user.save()
                const data = jwt.sign({
                    email: req.body.email,
                    id: user._id,
                    username: req.body.username
                }, secretToken)
                responseApi.successResponseWithData(res, "User created", {"accessToken":data})
            } else {
                responseApi.errorResponse(res, errors.emailDuplication.code, errors.emailDuplication.message)
            }
        }
    });
}

exports.forgotPassword = async function (req,res) {
    try {
        let User = await User.exist({email: req.body.email}) 
    
        if (!User) {
            return responseApi.errorResponse(res, error.unknownUser.code, error.unknownUser.message)
        } 
        
        // ici send un mail 
    } catch(e) {
        console.log(e)
    }
}