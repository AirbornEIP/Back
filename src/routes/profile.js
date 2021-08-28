const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/get', profileController.getProfile);
router.patch('/update', profileController.editProfile);
router.patch('/changeTheme', profileController.changeTheme);
router.get('/getTheme', profileController.getTheme);
// router.patch('changeLanguage', )
module.exports = router;
