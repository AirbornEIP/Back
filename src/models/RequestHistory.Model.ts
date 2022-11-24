import mongoose from 'mongoose';
import type { RequestHistoryType } from './Type';

const Request = new mongoose.Schema<RequestHistoryType>({
    link: { type: String, required: true },
    method: { type: String, required: true },
    body: { type: JSON, required: false },
    header: { type: Array, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('RequestHistory', Request);
