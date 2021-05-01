const secretToken = "57c0e0c9d9a6019c4d4b1e8643890c265739b58729b59502aaec2cb4d43fdff6707815f8e1718b847203d590be1c3f8c2500ab27b37ff3a6e19a6307043ee8a7"
const responseApi = require("../helpers/apiResponse")
const { errors } = require("../helpers/constant");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { mailer } = require("../helpers/mailer")
const { v4: uuidv4 } = require('uuid');
const ForgotPassword = require('../models/ForgotPassword')

exports.login = async function (req, res) {
    try {
        let exist = await User.exists({ email: req.body.email })
        if (exist === true) {
            let user = await User.findOne({ email: req.body.email })
            if (user.password === req.body.password) {
                let find = await User.findOne({ email: req.body.email })
                const accessToken = jwt.sign({
                    email: req.body.email,
                    id: find._id,
                    username: req.body.username
                }, secretToken)
                return (responseApi.successResponseWithData(res, "Success", { accessToken }))
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
    try {
        User.exists({ email: req.body.email }, async function (err, result) {
            if (err) {
                return res.send(err, 500);
            } else {
                if (result === false) {
                    const user = new User({ email: req.body.email, password: req.body.password, username: req.body.username });
                    await user.save()
                    const data = jwt.sign({
                        email: req.body.email,
                        id: user._id,
                        username: req.body.username
                    }, secretToken)
                    await mailer("Your account has been created", "Account Airborn created", req.body.email)
                    responseApi.successResponseWithData(res, "User created", { "accessToken": data })
                } else {
                    responseApi.errorResponse(res, errors.emailDuplication.code, errors.emailDuplication.message)
                }
            }
        });
    } catch (e) {
        console.log(e)
    }
}

exports.forgotPassword = async function (req, res) {
    try {
        let email = req.body.email;
        let user = await User.findOne({ email})
        const uuid = uuidv4()
        console.log(user)
        if (!user) {
            return responseApi.errorResponse(res, errors.unknownUser.code, errors.unknownUser.message)
        }
        await mailer("http://localhost:8081/forgot-password?" + uuid, "Forgot Password Airborn", email)
        const forgotPassword = new ForgotPassword({ UserId: user._id, uuid })
        await forgotPassword.save();
        console.log(uuid)
        return responseApi.successResponse(res, "Email sent")
    } catch (e) {
        console.log(e)
    }
}

exports.changePassword = async function(req, res) {
    try { 
        let uuid = req.body.uuid
        let password = req.body.password
        console.log(password)
        let user;
        let UserPassword = await ForgotPassword.findOne({uuid})
        if (!UserPassword) {
            return responseApi.errorResponse(res, error.unknownUser.code, error.unknownUser.message)
        } 
        console.log(UserPassword.UserId)
        console.log(UserPassword)
        user = await User.findOneAndUpdate({_id: UserPassword.UserId}, {password})
        
console.log(user)
return (res.send(user.password))
    } catch(e) {
        console.log(e)
    }
}