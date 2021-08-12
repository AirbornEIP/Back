require('dotenv').config();

const express = require('express')
const cors = require('cors')

const apiRoutes = require("./routes")
const apiResponse = require("./helpers/apiResponse")

const app = express();


if (!process.env.NODE_ENV) {
    console.error("No NODE_ENV in .env")
    process.exit(1)
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API running')
})


app.use('/api/', apiRoutes)

app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "Not found");
});

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
    return apiResponse.errorResponse(res, err.message);
})

module.exports = app
