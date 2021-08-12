const mongoose = require("mongoose");

const NotamShena = new mongoose.Schema({
    link: {
        type: String
    },
    name: {
        type: String
    },
});

const Notam = mongoose.model("Notam", NotamShena);
module.exports = Notam;
