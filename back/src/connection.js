const mongoose = require("mongoose");
    const connection = "mongodb://mongo:27017/mongo-test";
const connectDb = () => {
    return mongoose.connect(connection, () => {
        console.log("data base is connected")
    });
};
module.exports = connectDb;
