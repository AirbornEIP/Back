const connectDb = require("./connection");
const express = require('express')
const app = express();
const port = 8080;
const cors = require('cors')
const apiRouter = require("./routes/api")
app.use(express.json())
app.use(cors())

app.use("/api/", apiRouter);

connectDb();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
