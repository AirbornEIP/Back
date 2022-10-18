import mongoose from 'mongoose';
import type { VacType } from './Type';

const VacSchema = new mongoose.Schema<VacType>({
    link: { type: String, required: true },
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

const Vac = mongoose.model('Vac', VacSchema);
module.exports = Vac;
