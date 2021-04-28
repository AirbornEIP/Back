const {validationMessages} = require("../helpers/constant");
const {body, sanitizeBody} = require("express-validator");
const validationMiddlewares = require("./validation");
const auth = require('../controllers/authController')

exports.register = [
    body("email")
        .isLength({min: 1}).trim().withMessage(validationMessages.emailMissing)
        .isEmail().withMessage(validationMessages.emailInvalid),
    body("password")
        .isLength({min: 6}).trim().withMessage(validationMessages.passwordInvalid),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),
    validationMiddlewares.checkEmailDuplication,
    validationMiddlewares.checkValidation,
    validationMiddlewares.checkValideUsername,
    auth.register
];

exports.login = [
    body("email")
        .isLength({min: 1}).trim().withMessage(validationMessages.emailMissing)
        .isEmail().withMessage(validationMessages.emailInvalid),
    body("password")
        .isLength({min: 1}).trim().withMessage(validationMessages.passwordMissing),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),
    validationMiddlewares.checkValidation,
    auth.login
];

exports.forgotPassword = [
    auth.forgotPassword
]