const express = require('express');
const imageDocumentController = require('../controllers/imageController');

const router = express.Router();

router.get('/get', imageDocumentController.getImage);
router.post('/post', imageDocumentController.addImage);
router.delete('/delete', imageDocumentController.getProfile);

module.exports = router;
