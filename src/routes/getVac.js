const express = require('express');

const app = express();
const vac = require('../controllers/vacController');

app.post('/update', vac.update);
app.post('/get/', vac.get);

module.exports = app;
