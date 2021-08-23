const mongoose = require("mongoose");
const { getFileInfo } = require("prettier");
const supertest = require("supertest")
const fetch = require("node-fetch")
const JSON = require('fast-json-stable-stringify')
const app = require("../../app")
const database = "mongodb://mongoDB:27017/auth-test";

async  function call (url, body) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: {email: "test@test.fr", password: "proutcaca"}
    })
    console.log(response)
    return response.status
}
describe("Auth tests", () => {
    it('register', async () => {
        let result = await call('http://0.0.0.0:8080/api/auth/register')
        // const result  = await fetch('http://0.0.0.0:8080/api/auth/register', {
        //     method: 'POST',
        //     body: {
        //         "email": "mathieuterdwscean@gmail.com",
        //         "password": "ZebiLamouche",
        //         "username": "prrdout"
        //     },
        //     headers: {
        //         'Content-Type': "application/json",
        //     },
        // })
        console.log(result)
        expect(result.status).toBe(200);
    });
    // beforeAll(async () => {
    //     try {
    //         await mongoose.connect(database, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true
    //         });
    //     } catch (e) {
    //         console.error(e)
    //         process.exit(1)
    //     }
    // })

    // afterAll(async () => {
    //     const collections = await mongoose.connection.db.collections()

    //     for (let collection of collections) {
    //         await collection.deleteMany()
    //     }
    //     await mongoose.disconnect()
    // })

    const user = {
        email: "test@test.test.fr",
        password: "password",
    }

    describe("Register tests",  () => {
        it.skip('should return a validation error', async () => {
            expect(await call("http://0.0.0.0:8080/api/auth/register", null)).toBe(400)
        })

        it.skip('should register the user', async () => {
            expect(await call("http://0.0.0.0:8080/api/auth/register", user)).toBe(200)
        })

        it.skip('should return a duplication error', async () => {
            const response = await supertest(app)
                .post("/api/auth/register")
                .send(user)

            expect(response.status).toBe(400)
        })


    describe("Login tests", () => {
        it.skip('should return a validation error', async () => {
            const response = await supertest(app)
                .post("/api/auth/login")
                .send({})

            expect(response.status).toBe(400)
        })

        // it('should return an unauthorized error', async () => {
        //     const response = await supertest(app)
        //         .post("/api/auth/login")
        //         .send({email: user.email, password: `${user.password}1`})

        //     expect(response.status).toBe(401)
        // })

        it.skip('should login the user', async () => {
            const response = await supertest(app)
                .post("/api/auth/login")
                .send(user)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("jwtToken")
        })
    })
})
});
