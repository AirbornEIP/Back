const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.ObjectId, required: true },
    isPublic: { type: Boolean, required: false, default: false },
    history: { type: [mongoose.ObjectId] },
    data: { type: String, required: true },
    updatedAt: { type: Date, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

const flyPlan = mongoose.model('flyPlan', userSchema);
module.exports = flyPlan;
