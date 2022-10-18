import mongoose from 'mongoose';
import type { FeedBackType } from './Type';

const feedBackShema = new mongoose.Schema<FeedBackType>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userId: { type: mongoose.ObjectId, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

const feedBack = mongoose.model('Feedback', feedBackShema);
module.exports = feedBack;
