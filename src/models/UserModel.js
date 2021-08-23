const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: false },
    banned: { type: Boolean, required: true, default: false },
    username: { type: String, required: true },

});

userSchema.methods.isPasswordCorrect = async (password) => {
    await bcrypt.compare(password, this.password);
};

userSchema.methods.isBan = () => this.banned;

module.exports = mongoose.model('User', userSchema);
