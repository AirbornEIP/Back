const express = require('express');

const app = express.Router();
const notam = require('../../controllers/notamController');

app.post('/get', notam.getNotam);

module.exports = app;
