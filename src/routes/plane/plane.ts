import express from 'express';

const router: express.Router = express.Router();
// eslint-disable-next-line import/extensions
const plane = require('../../controllers/planeController');

// console.log(router)
router.post('/add', plane.add);
router.get('/get', plane.get);
router.get('/getAll', plane.getAll);
router.delete('/delete', plane.delete);

module.exports = router;
