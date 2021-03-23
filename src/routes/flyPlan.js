const express = require("express");
const app = express();
const flyPlan = require("../midleware/flyPlan")

app.post("/get",flyPlan.get )
app.post('/add',  flyPlan.add)
app.post('/remove',  flyPlan.remove)
app.get('/getAll/', flyPlan.getAll)
module.exports = app;
