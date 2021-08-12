const mongoose = require("mongoose");
const supertest = require("supertest")

const app = require("../../app")
const database = "mongodb://mongo:27017/targets-test";

const TargetModel = require("../../models/TargetModel")

describe("Targets tests", () => {
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

    let jwt = null
    it("should register an user", async () => {
        const resRegister = await supertest(app)
            .post("/api/auth/register")
            .send(user)

        jwt = resRegister.body.jwtToken
    })

    const fakeTarget = {
        name: "Audi Agadir",
        url: "https://www.avito.ma/fr/agadir/audi"
    }

    let targetCreatedId = null

    describe("Create a target", () => {
        it('should return unauthorized error', async () => {
            const response = await supertest(app)
                .post("/api/targets")
                .set('Authorization', `Bearer ${jwt}1`)

            expect(response.status).toBe(401)
        })

        it('should return validation error (no body)', async () => {
            const response = await supertest(app)
                .post("/api/targets")
                .set('Authorization', `Bearer ${jwt}`)

            expect(response.status).toBe(400)
        })

        it('should return validation error (bad url)', async () => {
            const response = await supertest(app)
                .post("/api/targets")
                .set('Authorization', `Bearer ${jwt}`)
                .send({
                    name: "Test",
                    url: "www.avito.ma/fr/agadir/audi"
                })

            expect(response.status).toBe(400)
        })

        it('should create a target', async () => {
            const response = await supertest(app)
                .post("/api/targets")
                .set('Authorization', `Bearer ${jwt}`)
                .send(fakeTarget)

            expect(response.status).toBe(200)

            targetCreatedId = response.body._id
        })
    })

    describe("Get targets", () => {
        it('should return unauthorized error', async () => {
            const response = await supertest(app)
                .get("/api/targets")
                .set('Authorization', `Bearer ${jwt}1`)

            expect(response.status).toBe(401)
        })

        it('should return targets', async () => {
            const response = await supertest(app)
                .get("/api/targets")
                .set('Authorization', `Bearer ${jwt}`)

            expect(response.status).toBe(200)
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.body[0].name).toBe(fakeTarget.name)
            expect(response.body[0].enable).toBe(true)
            expect(response.body[0].url).toBe(fakeTarget.url)
        })
    })

    const fakeUpdateTarget = {
        name: "BMW Marrakech",
        url: "https://www.avito.ma/fr/marrakech/bmw",
        enable: false
    }

    describe("Update a target", () => {
        it('should return unauthorized error', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}1`)

            expect(response.status).toBe(401)
        })

        it('should return validation error (no body)', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`)

            expect(response.status).toBe(400)
        })

        it('should return validation error (bad url)', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`)
                .send({
                    name: "Test",
                    url: "www.avito.ma/fr/agadir/audi"
                })

            expect(response.status).toBe(400)
        })

        it('should update a target', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(fakeUpdateTarget)

            expect(response.status).toBe(200)
        })

        it('should return updated target', async () => {
            const response = await supertest(app)
                .get("/api/targets")
                .set('Authorization', `Bearer ${jwt}`)

            expect(response.status).toBe(200)
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.body[0].name).toBe(fakeUpdateTarget.name)
            expect(response.body[0].enable).toBe(false)
            expect(response.body[0].url).toBe(fakeUpdateTarget.url)
        })
    })

    describe("Remove a target", () => {
        it('should return unauthorized error', async () => {
            const response = await supertest(app)
                .delete(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}1`)

            expect(response.status).toBe(401)
        })

        it('should return unauthorized error', async () => {
            const response = await supertest(app)
                .delete(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`)

            expect(response.status).toBe(200)
        })

        it('should return no targets', async () => {
            const response = await supertest(app)
                .get("/api/targets")
                .set('Authorization', `Bearer ${jwt}`)

            expect(response.status).toBe(200)
            expect(response.body.length).toBe(0)
        })
    })

    describe("Multi targets", () => {
        const multiFakeTarget = [
            {
                name: "Range Maroc",
                url: "https://www.avito.ma/fr/maroc/v%C3%A9hicules/range--%C3%A0_vendre"
            },
            {
                name: "Citroen Maroc",
                url: "https://www.avito.ma/fr/maroc/voitures/citroen--%C3%A0_vendre"
            },
            {
                name: "Mercedes Maroc",
                url: "https://www.avito.ma/fr/maroc/voitures/mercedes--%C3%A0_vendre"
            },
            {
                name: "Kia Maroc",
                url: "https://www.avito.ma/fr/maroc/voitures/kia--%C3%A0_vendre"
            },
            {
                name: "Maserati Maroc",
                url: "https://www.avito.ma/fr/maroc/voitures/maserati--%C3%A0_vendre"
            },
            {
                name: "Honda Maroc",
                url: "https://www.avito.ma/fr/maroc/v%C3%A9hicules/honda--%C3%A0_vendre"
            },
        ]

        it('should create 5 targets successfully', async () => {
            await TargetModel.deleteMany()

            for (let i = 0; i < 5; i++) {
                const response = await supertest(app)
                    .post("/api/targets")
                    .set('Authorization', `Bearer ${jwt}`)
                    .send({
                        name: multiFakeTarget[i].name,
                        url: multiFakeTarget[i].url
                    })

                expect(response.status).toBe(200)
            }
        })

        it("should fail to create more than 5 targets", async () => {
            const response = await supertest(app)
                .post("/api/targets")
                .set('Authorization', `Bearer ${jwt}`)
                .send({
                    name: multiFakeTarget[5].name,
                    url: multiFakeTarget[5].url
                })

            expect(response.status).toBe(400)
        })
    })
})
