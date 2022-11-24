const express = require('express');

const router = express.Router();
const vac = require('../../controllers/vacController.ts');

router.post('/get', vac.getVac);
router.post('/getAll', vac.getAllVac);

module.exports = router;
