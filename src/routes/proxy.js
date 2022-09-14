const express = require('express');

const proxyRouter = express.Router();
const proxy = require('../controllers/proxy');

proxyRouter.post('/metar', proxy.metar);

export default proxyRouter;

