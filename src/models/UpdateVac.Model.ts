import mongoose from 'mongoose';

type Vac = {
    nextUpdate: string,
    currentDate: string,
    createdAt: Date,
    updatedAt: Date,
}
const VacUpdatesSchema = new mongoose.Schema<Vac>({
    nextUpdate: { type: String },
    currentDate: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

const VacUpdate = mongoose.model('VacUpdate', VacUpdatesSchema);
module.exports = VacUpdate;

// export default Vac;
