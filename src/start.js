require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const connectDB = require("./database");

const app = require("./app")
const port = process.env.PORT;


connectDB()

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`)
})
