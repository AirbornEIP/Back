const express = require('express');
const router = express.Router();
// eslint-disable-next-line import/extensions
const auth = require('../../controllers/authController');

// console.log(router)
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/forgot-password', auth.forgotPassword);
router.post('/change-password', auth.changePassword);
router.post('/register-google', auth.registerGoogle);
router.post('/confirm-email', auth.confirmEmail);
module.exports = router;
