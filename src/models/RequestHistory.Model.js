const mongoose = require('mongoose');

const Request = new mongoose.Schema({
    link: { type: String, required: true },
    method: { type: String, required: true },
    body: { type: JSON, required: false },
    header: { type: Array, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

const RequestHistory = mongoose.model('RequestHistory', Request);
module.exports = RequestHistory;
