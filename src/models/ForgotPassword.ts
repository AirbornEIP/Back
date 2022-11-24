import mongoose from 'mongoose';
import type { ForgotPasswordType } from './Type';

const ForgotPassword = new mongoose.Schema<ForgotPasswordType>({
    UserId: { type: mongoose.Types.ObjectId, required: true },
    uuid: { type: String, required: true },
});

module.exports = mongoose.model('fpassword', ForgotPassword);
