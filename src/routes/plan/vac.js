const express = require('express');

const app = express.Router();
const vac = require('../../controllers/vacController');

app.post('/get', vac.getVac);
app.post('/getAll', vac.getAllVac);
module.exports = app;
