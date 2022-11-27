import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { UserModel } = require('./models/User.Model.ts');

const database = 'mongodb://mongoDB:27017/test';

async function initData() {
    try {
        if (process.env.TEST_EMAIL, process.env.TEST_PASSWORD, process.env.TEST_SURNAME, process.env.TEST_NAME) {
            const hash = await bcrypt.hash(process.env.TEST_PASSWORD, 10);
            const result = await UserModel.findOne({ email: process.env.TEST_EMAIL });
            if (result) return (0);
            const user = new UserModel({
                email: process.env.TEST_EMAIL,
                password: hash,
                surname: process.env.TEST_SURNAME,
                name: process.env.TEST_NAME,
                admin: true,
            });
            await user.save();
        }
    } catch (e) {
        console.log(e);
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (process.env.STAGE === 'development') {
            await initData();
            console.log('user test set');
        }

        console.log('Database connected');
    } catch (err) {
        console.error('Database not connected');
    }
};

export default connectDB;
