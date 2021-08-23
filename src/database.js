const mongoose = require('mongoose');
const database = 'mongodb://mongoDB:27017/test';

const connectDB = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected")
    } catch(err) {
        console.error("Database not connected")
    }
};

module.exports = connectDB
