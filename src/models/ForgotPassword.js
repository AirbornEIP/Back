const mongoose = require('mongoose');

const ForgotPassword = new mongoose.Schema({
    UserId: {
        type: mongoose.ObjectId,
    },
    uuid: {
        type: String,
    },
});

const fpassword = mongoose.model('fpassword', ForgotPassword);
module.exports = fpassword;
