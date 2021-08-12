const mongoose = require("mongoose");
const database = "mongodb://mongo:27017/avito";

const connectDb = async () => {
    await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connectDb
