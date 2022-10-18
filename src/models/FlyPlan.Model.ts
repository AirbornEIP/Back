import type { FlyplanType } from './Type';

const mongoose = require('mongoose');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Flyplan = new mongoose.Schema<FlyplanType>({
    title: { type: String, required: true },
    userId: { type: mongoose.ObjectId, required: true },
    isPublic: { type: Boolean, required: false, default: false },
    history: { type: [mongoose.ObjectId] },
    data: { type: String, required: true },
    updatedAt: { type: Date, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

exports.FlyPlanModel = mongoose.model('flyPlan', Flyplan);
