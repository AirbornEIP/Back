import express from 'express';
import authRouter from './user/auth';
import proxyRouter from './proxy';
import flyPlan from './plan/flyPlan';
import plan from'./plan/plan';
import profile from './user/profile';
import feedback from './feedback/feedback';
import requestHistoryModel from '../models/RequestHistory.Model';
import app from '../app';
// const app = express();
// const app = express.Router();

async function saveRequest(req, res, next) {
    // eslint-disable-next-line new-cap
    const request = new requestHistoryModel({
        link: req.originalUrl,
        method: req.method,
        body: req.body,
        header: req.rawHeaders,
    });
    await request.save();
    next();
}
const routes = [
    app.use(saveRequest),
    app.use('/auth/', authRouter),
    app.use('/proxy/', proxyRouter),
    app.use('/flyPlan/', flyPlan),
    app.use('/profile/', profile),
    app.use('/plan/', plan),
    app.use('/feedback/', feedback),
];

module.exports = routes;
