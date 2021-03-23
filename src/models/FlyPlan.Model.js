const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String
    },
    userId: {
        type: mongoose.ObjectId
    },
    isPublic: {
        type: Boolean
    },
    data: {
        type: String
    }
});

const flyPlan = mongoose.model("flyPlan", userSchema);
module.exports = flyPlan;
