import express from 'express';
import authRouter from './user/auth';
import proxyRouter from './proxy';
import flyPlan from './plan/flyPlan';
import plan from './plan/plan';
// eslint-disable-next-line import/extensions
import plane from './plane/plane';
import profile from './user/profile';
import feedback from './feedback/feedback';
import RequestHistoryModel from '../models/RequestHistory.Model';

const rooter = express.Router();

async function saveRequest(req, res, next) {
    // eslint-disable-next-line new-cap
    const request = new RequestHistoryModel({
        link: req.originalUrl,
        method: req.method,
        body: req.body,
        header: req.rawHeaders,
    });
    await request.save();
    next();
}

const routes = [
    rooter.use(saveRequest),
    rooter.use('/auth/', authRouter),
    rooter.use('/proxy/', proxyRouter),
    rooter.use('/flyPlan/', flyPlan),
    rooter.use('/profile/', profile),
    rooter.use('/plane/', plane),
    rooter.use('/plan/', plan),
    rooter.use('/feedback/', feedback),
];

export default routes;
