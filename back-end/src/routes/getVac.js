const express = require("express");
const app = express();
const vac = require("../midleware/vac")

app.post("/update",vac.update )
app.post('/get/', vac.get)

module.exports = app;
