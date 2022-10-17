import mongoose from 'mongoose';

const database = 'mongodb://root:password@mongo:27017/?authSource=admin';
const connectDB = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Database not connected');
    }
};

export default connectDB;
