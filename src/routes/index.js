const express = require('express');

const authRouter = require('./user/auth');
const proxyRouter = require('./proxy');
const flyPlan = require('./plan/flyPlan');
const plan = require('./plan/plan');
const profile = require('./user/profile');
const feedback = require('./feedback/feedback');
const requestHistoryModel = require('../models/RequestHistory.Model');

const app = express();

async function saveRequest(req, res, next) {
    const request = new requestHistoryModel({
        link: req.originalUrl,
        method: req.method,
        body: req.body,
        header: req.rawHeaders,
    });
    await request.save();
    next();
}

const api = [
    saveRequest,
    app.use('/auth/', authRouter),
    app.use('/proxy/', proxyRouter),
    app.use('/flyPlan/', flyPlan),
    app.use('/profile/', profile),
    app.use('/plan/', plan),
    app.use('/feedback/', feedback),
];
module.exports = api;
