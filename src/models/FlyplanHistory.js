const mongoose = require('mongoose');

const FlyplanHistorySchema = new mongoose.Schema({
    flyplanId: { type: mongoose.ObjectId, required: true },
    userId: { type: mongoose.ObjectId, required: true },
    titleParent: { type: String, required: true },
    data: { type: String, required: true },
    id: { type: Number, required: true, default: 0 }, // Mettre un auto increment ici
    updatedAt: { type: Date, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

const flyPlanHistory = mongoose.model('flyPlanHistory', FlyplanHistorySchema);
module.exports = flyPlanHistory;
