const express = require('express');

const app = express.Router();
const vac = require('./vac');
const notam = require('./notam');
const taf = require('./taf');

app.use('/vac/', vac);
app.use('/notam/', notam);
app.use('/taf/', taf);

module.exports = app;
