import mongoose from 'mongoose';
import type { Vac } from './Type';

const VacUpdatesSchema = new mongoose.Schema<Vac>({
    nextUpdate: { type: String },
    currentDate: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

const VacUpdate = mongoose.model('VacUpdate', VacUpdatesSchema);
module.exports = VacUpdate;
