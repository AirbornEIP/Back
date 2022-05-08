const mongoose = require('mongoose');

const ForgotPassword = new mongoose.Schema({
    UserId: { type: mongoose.ObjectId, required: true },
    uuid: { type: String, required: true },
});

const fpassword = mongoose.model('fpassword', ForgotPassword);
module.exports = fpassword;
