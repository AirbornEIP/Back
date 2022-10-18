import mongoose from 'mongoose';
import type { FlyplanHistoryType } from './Type';

const FlyplanHistorySchema = new mongoose.Schema <FlyplanHistoryType>({
    flyplanId: { type: String, required: true },
    userId: { type: String, required: true },
    titleParent: { type: String, required: true },
    data: { type: String, required: true },
    id: { type: Number, required: true, default: 0 }, // Mettre un auto increment ici
    updatedAt: { type: Date, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

exports.FlyplanHistoryModel = mongoose.model('flyplanHistoryModel', FlyplanHistorySchema);
