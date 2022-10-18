import express from 'express';

const { get, post, getAll } = require('../../controllers/feedbackControllers.ts');

const router: express.Router = express.Router();

router.get('/get', get);
router.post('/post', post);
router.get('/getAll', getAll);

module.exports = router;
