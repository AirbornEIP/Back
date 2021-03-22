const mongoose = require("mongoose");

const VacShena = new mongoose.Schema({
    link: {
        type: String
    },
    name: {
        type: String
    },
});

const Vac = mongoose.model("Vac", VacShena);
module.exports = Vac;
