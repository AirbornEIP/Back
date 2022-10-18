import express from 'express';

const { getPlan } = require('../../controllers/planControllers.ts');
const vac = require('./vac');

const router = express.Router();

router.use('/vac/', vac);
router.use('/notam', getPlan);
router.use('/taf', getPlan);
router.use('/metar', getPlan);

module.exports = router;
