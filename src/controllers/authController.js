const bcrypt = require("bcryptjs");
const {body} = require("express-validator");
const UserModel = require("../models/UserModel");
const fetch = require("node-fetch")
const validationMiddlewares = require("../middlewares/validation");
const apiResponse = require("../helpers/apiResponse");
const ForgotPassword = require('../models/ForgotPassword');
const utility = require("../helpers/utility");
const {errorMessages, validationMessages, errors} = require("../helpers/constants");
const responseApi = require("../helpers/apiResponse")
const {mailer} = require("../helpers/mailer")
const { v4: uuidv4 } = require('uuid');
// console.log(uuid());

exports.register = [
    body("email")
        .isLength({min: 1}).trim().withMessage(validationMessages.emailMissing)
        .isEmail().withMessage(validationMessages.emailInvalid),
    body("password")
        .isLength({min: 6}).trim().withMessage(validationMessages.passwordInvalid),
    validationMiddlewares.checkEmailDuplication,
    validationMiddlewares.checkValidation,
    registerRequest
];

exports.login = [
    body("email")
        .isEmail().withMessage(validationMessages.emailInvalid),
    body("password")
        .isLength({min: 1}).withMessage(validationMessages.passwordMissing),
    validationMiddlewares.checkValidation,
    loginRequest
];


exports.forgotPassword = [
    forgotPassword
]

exports.changePassword = [
    changePassword
]

exports.registerGoogle = [
    registerGoogle
]


async function registerRequest(req, res) {
    try {
    const {email, password, username} = req.body
    const hash = await bcrypt.hash(password, 10);

    const user = new UserModel({
        email,
        password: hash,
        username
    });

    const saveUser = await user.save();
    await mailer("Your account has been created", "Account Airborn created", req.body.email)
    const jwtToken = utility.generateJwtToken(saveUser._id, saveUser.email);

    return apiResponse.successResponseWithData(res, {
        jwtToken,
        profile: {
            id: saveUser._id,
            email: saveUser.email
        }
    });
    }catch (e) {
        console.log(e)
    }

} 


async function loginRequest(req, res) {
    try {
    const {email, password} = req.body
    const user = await UserModel.findOne({email});
    if (!user) {
        return apiResponse.unauthorizedResponse(res, errorMessages.wrongCredentials);
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return apiResponse.unauthorizedResponse(res, errorMessages.wrongCredentials);
    } else if (user.isBan()) {
        return apiResponse.unauthorizedResponse(res, errorMessages.bannedUser);
    }

    const jwtToken = utility.generateJwtToken(user._id, user.email);

    return apiResponse.successResponseWithData(res, {
        jwtToken,
        profile: {
            id: user._id,
            email: user.email
        }
    });
    } catch(e) {
        console.log(e)
    } 
}


  async function registerGoogle (req, res) {
    try {
        let email = req.user.email
        let code = decodeURIComponent(req.body.code)
        if (!code) {
            return (apiResponse.errorResponse(res, 0, errorMessages.invalidToken))
        }
        let params = {
            code: code,
            client_id: '981541357136-ufmit25u5r3uq96s98quvltpsam99k74.apps.googleusercontent.com',
            client_secret: 'S8fUS5IvZEiXJT_xvP6XYxyl',
            access_type: "offline",
            redirect_uri: "http://0.0.0.0:8080/loginGoogle",
            grant_type: "authorization_code"
        };
        let t = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            body: qs.stringify(params)
        })
        let json = await t.json()
        console.log(json)
    } catch(e) {
        console.log(e)
    }
}

async function changePassword(req, res) {
    try { 
        let uuid = req.body.uuid
        let password = req.body.password
        let UserPassword = await ForgotPassword.findOne({uuid})
        const hash = await bcrypt.hash(password, 10);

        if (!UserPassword) {
            return responseApi.errorResponse(res, errors.unknownUser.code, errors.unknownUser.message)
        } 
       let  id = UserPassword.UserId
       let user = await UserModel.findOneAndUpdate({_id: id }, {password: hash});
       if (user) {
           await ForgotPassword.findOneAndDelete(uuid)
           return (responseApi.successResponse(res, "Password has been updated"))
       }
    } catch(e) {
        responseApi.errorResponse(res, e)
        console.log(e)
    }
}

async function forgotPassword (req, res) {
    try {
        let email = req.body.email;
        let user = await UserModel.findOne({ email})
        const uuid = uuidv4()
        console.log(uuid)
        if (!user) {
            return responseApi.errorResponse(res, errorMessages.unknownUser.code, errorMessages.unknownUser.message)
        }

        await mailer("http://0.0.0.0:3000/reset?" + uuid, "Forgot Password Airborn", email)
        const forgotPassword = new ForgotPassword({ UserId: user._id, uuid })
        await forgotPassword.save();
        return responseApi.successResponse(res, "Email sent")

    } catch (e) {
        console.log(e)
    }
}