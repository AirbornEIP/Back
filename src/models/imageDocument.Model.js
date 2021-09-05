const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    authorId: {
        type: mongoose.ObjectId,
    },
    isPublic: {
        type: Boolean,
    },
    imageURL: {
        type: String,
    },
});

const imageDocument = mongoose.model('imageDocument', imageSchema);
module.exports = imageDocument;
