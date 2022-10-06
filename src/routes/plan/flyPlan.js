const express = require('express');

const app = express.Router();
const flyPlan = require('../../controllers/flyPlanController');

app.post('/get', flyPlan.get);
app.post('/add', flyPlan.add);
app.post('/remove', flyPlan.remove);
app.post('/addHistory', flyPlan.addHistory);
app.get('/getAll/', flyPlan.getAll);
module.exports = app;
