const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserId: { type: mongoose.ObjectId, required: true },
    data: { type: String, required: true },
    like: { type: [mongoose.ObjectId], required: false },
    message: {
        name: String,
        ownerId: mongoose.ObjectId,
        reply: [{
            ownerId: mongoose.ObjectId,
        }],
    },
    updatedAt: { type: Date, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre('save', (next) => {
    console.log('test');
    next();
});

const Post = mongoose.model('Post', userSchema);
module.exports = Post;
