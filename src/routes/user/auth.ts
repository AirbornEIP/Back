import express from 'express';

const router = express.Router();
const auth = require('../../controllers/authController.ts');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/forgot-password', auth.forgotPassword);
router.post('/change-password', auth.changePassword);
router.post('/register-google', auth.registerGoogle);
router.post('/confirm-email', auth.confirmEmail);
router.delete('/delete', auth.deleteUser);

module.exports = router;
