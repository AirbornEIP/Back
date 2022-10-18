const express = require('express');
const { getPlan } = require('../../controllers/planControllers.ts');

const router = express.Router();
const vac = require('./vac');

router.use('/vac/', vac);
router.use('/notam', getPlan);
router.use('/taf', getPlan);
router.use('/metar', getPlan);

module.exports = router;
