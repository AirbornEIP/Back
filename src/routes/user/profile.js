const express = require('express');
const profileController = require('../../controllers/profileController');
const validation = require('../../middlewares/auth');

const router = express.Router();

router.get('/get', validation.checkValidationEmail, profileController.getProfile);
router.patch('/update', profileController.editProfile);
router.patch('/changeTheme', profileController.changeTheme);
router.get('/getTheme', profileController.getTheme);
router.post('/uploadAvatar', profileController.uploadAvatar);
// router.patch('changeLanguage', )
module.exports = router;
