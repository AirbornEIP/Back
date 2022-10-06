import mongoose from 'mongoose';

type Message = {
    message: {
        ownerId: mongoose.ObjectId,
        reply: [{
            ownerId: mongoose.ObjectId,
            message: string,
        }],
    }
    createdAt: Date,
    updatedAt: Date,
}

const MessageSchema = new mongoose.Schema<Message>({
    message: {
        ownerId: String,
        reply: [{
            ownerId: String,
            message: String,
        }],
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

const Messages = mongoose.model('Message', MessageSchema);
module.exports = Messages;
