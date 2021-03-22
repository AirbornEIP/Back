const express = require("express");
const app = express();
const auth = require("../midleware/auth")

app.post("/register", auth.register)
app.post('/login',  auth.login)

module.exports = app;
