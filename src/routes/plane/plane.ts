import express from 'express';

const router: express.Router = express.Router();
const plane = require('../../controllers/planeController.ts');

router.post('/add', plane.add);
router.get('/get', plane.get);
router.get('/getAll', plane.getAll);
router.delete('/delete', plane.delete);
module.exports = router;
