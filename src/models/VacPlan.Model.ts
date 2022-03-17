import mongoose from 'mongoose';

// type VacType = {
//     link: string,
//     name: string,
//     createdAt: Date,
//     updatedAt: Date,
// }

const VacSchema = new mongoose.Schema(<any> {
    link: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

const Vac = mongoose.model('Vac', VacSchema);
module.exports = Vac;

// export default Vac;
