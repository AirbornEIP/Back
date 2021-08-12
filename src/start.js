const connectDb = require("./database");

const app = require("./app")
const port = 8080;


connectDb().then(() => console.log("Database connected"))

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})



