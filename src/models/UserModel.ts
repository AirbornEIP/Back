import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

type user = {
    email: string,
    password: string,
    banned: boolean
    username: string
    verifiedEmail: boolean
    name: string
    avatar: string
    surname: string
    theme: boolean
    language: number
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new mongoose.Schema<user>({
    email: { type: String, required: true },
    password: { type: String, required: false },
    banned: { type: Boolean, required: true, default: false },
    username: { type: String, required: true },
    verifiedEmail: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    surname: { type: String, required: true },
    theme: { type: Boolean, required: false, default: false },
    language: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

// eslint-disable-next-line func-names
userSchema.methods.isPasswordCorrect = async function (password: string) {
    // eslint-disable-next-line no-return-await
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isBan = function () { return this.banned; };
export default mongoose.model('User', userSchema);
