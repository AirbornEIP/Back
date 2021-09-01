const express = require('express');

const authRouter = require('./user/auth');
const proxyRouter = require('./proxy');
const flyPlan = require('./plan/flyPlan');
const plan = require('./plan/plan');
const profile = require('./user/profile');

const app = express();

app.use('/auth/', authRouter);
app.use('/proxy/', proxyRouter);
app.use('/flyPlan/', flyPlan);
app.use('/profile/', profile);
app.use('/plan/', plan);

module.exports = app;
