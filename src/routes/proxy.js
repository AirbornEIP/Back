const express = require('express');

const app = express.Router();
const proxy = require('../controllers/proxy');

app.post('/metar', proxy.metar);

module.exports = app;
