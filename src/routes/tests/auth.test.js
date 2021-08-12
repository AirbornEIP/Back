const mongoose = require("mongoose");
const supertest = require("supertest")

const app = require("../../app")
const database = "mongodb://mongo:27017/auth-test";

describe("Auth tests", () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(database, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    })

    afterAll(async () => {
        const collections = await mongoose.connection.db.collections()

        for (let collection of collections) {
            await collection.deleteMany()
        }
        await mongoose.disconnect()
    })

    const user = {
        email: "test@test.test",
        password: "password"
    }

    describe("Register tests", () => {
        it('should return a validation error', async () => {
            const response = await supertest(app)
                .post("/api/auth/register")
                .send({})

            expect(response.status).toBe(400)
        })

        it('should register the user', async () => {
            const response = await supertest(app)
                .post("/api/auth/register")
                .send(user)

            expect(response.status).toBe(200)
            expect(response.body.profile.email).toBe(user.email)
        })

        it('should return a duplication error', async () => {
            const response = await supertest(app)
                .post("/api/auth/register")
                .send(user)

            expect(response.status).toBe(400)
        })
    })

    describe("Login tests", () => {
        it('should return a validation error', async () => {
            const response = await supertest(app)
                .post("/api/auth/login")
                .send({})

            expect(response.status).toBe(400)
        })

        it('should return an unauthorized error', async () => {
            const response = await supertest(app)
                .post("/api/auth/login")
                .send({email: user.email, password: `${user.password}1`})

            expect(response.status).toBe(401)
        })

        it('should login the user', async () => {
            const response = await supertest(app)
                .post("/api/auth/login")
                .send(user)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("jwtToken")
        })
    })
})
