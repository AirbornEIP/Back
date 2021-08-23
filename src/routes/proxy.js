const express = require('express');

const app = express();
const proxy = require('../controllers/proxy');

app.post('/metar', proxy.metar);

module.exports = app;
