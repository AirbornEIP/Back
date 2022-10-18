import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { user } from './Type';

const userSchema = new mongoose.Schema<user>({
    email: { type: String, required: true },
    password: { type: String, required: false },
    banned: { type: Boolean, required: true, default: false },
    verifiedEmail: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    surname: { type: String, required: true },
    theme: { type: Boolean, required: false, default: false },
    admin: { type: Boolean, required: false, default: false },
    language: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

// eslint-disable-next-line func-names
userSchema.methods.isPasswordCorrect = async function (password: string) {
    // eslint-disable-next-line no-return-await
    return await bcrypt.compare(password, this.password);
};

// eslint-disable-next-line func-names
userSchema.methods.isBan = function () { return this.banned; };

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
