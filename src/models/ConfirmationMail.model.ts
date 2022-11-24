import mongoose from 'mongoose';
import type { ConfirmEmailType } from './Type';

const ConfirmMail = new mongoose.Schema<ConfirmEmailType>({
    UserId: { type: mongoose.Types.ObjectId, required: true },
    email: { type: String, required: true },
    uuid: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

const confMail = mongoose.model('confMail', ConfirmMail);
module.exports = confMail;
