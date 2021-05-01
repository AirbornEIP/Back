const express = require("express");
const app = express();
const auth = require("../midleware/auth")

app.post("/register", auth.register)
app.post('/login',  auth.login)
app.post('/forgot-password', auth.forgotPassword) 
app.post('/change-password', auth.changePassword) 


module.exports = app;
