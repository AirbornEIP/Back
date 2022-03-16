const express = require('express');

const app = express.Router();
// eslint-disable-next-line import/extensions
const feedback = require('../../controllers/feedbackControllers.js');

app.get('/get', feedback.get);
app.post('/post', feedback.post);
app.get('/getAll', feedback.getAll);
module.exports = app;
