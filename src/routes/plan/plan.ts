import express from 'express';

const { getPlan } = require('../../controllers/planControllers.ts');
const vac = require('./vac.ts');

const router = express.Router();

router.all('/vac/', vac);
router.all('/notam', getPlan);
router.all('/taf', getPlan);
router.all('/metar', getPlan);

module.exports = router;
