const express = require('express');

const authRouter = require('./auth');
const proxyRouter = require('./proxy');
const flyPlan = require('./flyPlan');
const getVac = require('./getVac');
const profile = require('./profile');

const app = express();

app.use('/auth/', authRouter);
app.use('/proxy/', proxyRouter);
app.use('/flyPlan/', flyPlan);
app.use('/profile/', profile);
app.use('/vac/', getVac);

module.exports = app;
