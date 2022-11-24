import express from 'express';

const { getProfile, editProfile, banUser, changeTheme, getTheme, uploadAvatar } = require('../../controllers/profileController.ts');

const router = express.Router();

router.get('/get', getProfile);

router.patch('/update', editProfile);
router.patch('/banUser', banUser);
router.patch('/changeTheme', changeTheme);
router.get('/getTheme', getTheme);
router.post('/uploadAvatar', uploadAvatar);
// router.patch('changeLanguage', )
module.exports = router;
