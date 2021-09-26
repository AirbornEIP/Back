const mongoose = require('mongoose');

const VacShena = new mongoose.Schema({
    link: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

const Vac = mongoose.model('Vac', VacShena);
module.exports = Vac;
