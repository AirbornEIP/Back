"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var apiRoutes = require("./routes");
var apiResponse = require("./helpers/apiResponse");
require('dotenv').config({ path: ".env.".concat(process.env.NODE_ENV.length ? process.env.NODE_ENV : 'development') });
var app = (0, express_1["default"])();
app.disable('x-powered-by');
if (!process.env.NODE_ENV) {
    console.error('No NODE_ENV in .env');
    process.exit(1);
}
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    res.send('API running');
});
app.use('/api/', apiRoutes);
app.all('*', function (req, res) { return apiResponse.notFoundResponse(res, 'Not found'); });
app.use(function (err, req, res) {
    if (err.name === 'UnauthorizedError') {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
    return apiResponse.errorResponse(res, err.message);
});
exports["default"] = app;
