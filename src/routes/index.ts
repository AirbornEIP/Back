import express from 'express';
import authRouter from './user/auth';
import flyPlan from './plan/flyPlan';
import profile from './user/profile';
import feedback from './feedback/feedback';
import RequestHistoryModel from '../models/RequestHistory.Model';

const plane = require('./plane/plane.ts');
const plan = require('./plan/plan.ts');

const rooter = express.Router();

async function saveRequest(req, res, next) {
    const request = new RequestHistoryModel({
        link: req.originalUrl,
        method: req.method,
        body: req.body,
        header: req.rawHeaders,
    });
    await request.save();
    next();
}

exports.routes = [
    rooter.use(saveRequest),
    rooter.use('/auth/', authRouter),
    rooter.use('/flyPlan/', flyPlan),
    rooter.use('/profile/', profile),
    rooter.use('/plane/', plane),
    rooter.use('/plan/', plan),
    rooter.use('/feedback/', feedback),
];
