const mongoose = require('mongoose');

const feedBackShema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.ObjectId, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

const feedBack = mongoose.model('Feedback', feedBackShema);
module.exports = feedBack;
