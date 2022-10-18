import express from 'express';

const {
    get, add, getAll, getHistory, addHistory, remove,
} = require('../../controllers/flyPlanController.ts');

const app = express.Router();

app.post('/get', get);
app.post('/add', add);
app.post('/remove', remove);
app.post('/addHistory', addHistory);
app.get('/getHistory', getHistory);
app.get('/getAll/', getAll);

module.exports = app;
