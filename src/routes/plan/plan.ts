import express from 'express';

const { getPlan } = require('../../controllers/planControllers.ts');
const vac = require('./vac.ts');

const router = express.Router();

router.use('/vac/', vac);
router.get('/notam', getPlan);
router.get('/taf', getPlan);
router.get('/metar', getPlan);

module.exports = router;
