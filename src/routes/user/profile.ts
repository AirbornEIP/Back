import express from 'express';

const profileController = require('../../controllers/profileController');

const router = express.Router();

router.get('/get', profileController.getProfile);

router.patch('/update', profileController.editProfile);
router.patch('/banUser', profileController.banUser);
router.patch('/changeTheme', profileController.changeTheme);
router.get('/getTheme', profileController.getTheme);
router.post('/uploadAvatar', profileController.uploadAvatar);
// router.patch('changeLanguage', )
module.exports = router;
