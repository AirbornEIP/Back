const mongoose = require('mongoose');

const ConfirmMail = new mongoose.Schema({
    UserId: { type: mongoose.ObjectId, required: true },
    email: { type: String, required: true },
    uuid: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

const confMail = mongoose.model('confMail', ConfirmMail);
module.exports = confMail;
