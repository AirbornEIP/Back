const express = require('express');

const app = express.Router();
const taf = require('../../controllers/tafController');

app.post('/get/', taf.getTaf);

module.exports = app;