const express = require('express');

const app = express();
const notam = require('../../controllers/notamController,js');

app.post('/get', notam.getNotam);

module.exports = app;
