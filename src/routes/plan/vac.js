const express = require('express');

const app = express();
const vac = require('../../controllers/vacController');

app.post('/get', vac.getVac);

module.exports = app;
