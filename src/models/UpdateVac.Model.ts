import mongoose from 'mongoose';

const VacUpdatesSchema = new mongoose.Schema(<any> {
    nextUpdate: { type: String },
    currentDate: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

const VacUpdate = mongoose.model('VacUpdate', VacUpdatesSchema);
module.exports = VacUpdate;

// export default Vac;
