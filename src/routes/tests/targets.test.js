/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../../app');

// const database = 'mongodb://mongoDB:27017/targets-test';

// const TargetModel = require("../../models/TargetModel")

describe('Targets tests', () => {
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

    // const user = {
    //     email: "test@test.test",
    //     password: "password"
    // }

    let jwt = null;
    it.skip('should register an user', async () => {
        const resRegister = await supertest(app)
            .post('/api/auth/register')
            .send(user);

        jwt = resRegister.body.jwtToken;
    });

    const fakeTarget = {};

    let targetCreatedId = null;

    describe('Create a target', () => {
        it.skip('should return unauthorized error', async () => {
            const response = await supertest(app)
                .post('/api/targets')
                .set('Authorization', `Bearer ${jwt}1`);

            expect(response.status).toBe(401);
        });

        it.skip('should return validation error (no body)', async () => {
            const response = await supertest(app)
                .post('/api/targets')
                .set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(400);
        });

        it.skip('should return validation error (bad url)', async () => {
            const response = await supertest(app)
                .post('/api/targets')
                .set('Authorization', `Bearer ${jwt}`)
                .send({
                    name: 'Test',
                    url: 'www.avit.skipo.ma/fr/agadir/audi',
                });

            expect(response.status).toBe(400);
        });

        it.skip('should create a target', async () => {
            const response = await supertest(app)
                .post('/api/targets')
                .set('Authorization', `Bearer ${jwt}`)
                .send(fakeTarget);

            expect(response.status).toBe(200);

            targetCreatedId = response.body._id;
        });
    });

    describe('Get targets', () => {
        it.skip('should return unauthorized error', async () => {
            const response = await supertest(app)
                .get('/api/targets')
                .set('Authorization', `Bearer ${jwt}1`);

            expect(response.status).toBe(401);
        });

        it.skip('should return targets', async () => {
            const response = await supertest(app)
                .get('/api/targets')
                .set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0].name).toBe(fakeTarget.name);
            expect(response.body[0].enable).toBe(true);
            expect(response.body[0].url).toBe(fakeTarget.url);
        });
    });

    const fakeUpdateTarget = {};

    describe('Update a target', () => {
        it.skip('should return unauthorized error', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}1`);

            expect(response.status).toBe(401);
        });

        it.skip('should return validation error (no body)', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(400);
        });

        it.skip('should return validation error (bad url)', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`)
                .send({
                    name: 'Test',
                    url: 'www.avito.ma/fr/agadir/audi',
                });

            expect(response.status).toBe(400);
        });

        it.skip('should update a target', async () => {
            const response = await supertest(app)
                .put(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(fakeUpdateTarget);

            expect(response.status).toBe(200);
        });

        it.skip('should return updated target', async () => {
            const response = await supertest(app)
                .get('/api/targets')
                .set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0].name).toBe(fakeUpdateTarget.name);
            expect(response.body[0].enable).toBe(false);
            expect(response.body[0].url).toBe(fakeUpdateTarget.url);
        });
    });

    describe('Remove a target', () => {
        it.skip('should return unauthorized error', async () => {
            const response = await supertest(app)
                .delete(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}1`);

            expect(response.status).toBe(401);
        });

        it.skip('should return unauthorized error', async () => {
            const response = await supertest(app)
                .delete(`/api/targets/${targetCreatedId}`)
                .set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(200);
        });

        it.skip('should return no targets', async () => {
            const response = await supertest(app)
                .get('/api/targets')
                .set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(0);
        });
    });

    // multiFakeTarget est vide, comment ça peut marché ?? (antoine)
    // PS: je le mets en commentaire psk ça fait des erreurs sur sonar
    // C'est pas normal que multiFakeTarget soit vide
    // describe('Multi targets', () => {
    //     const multiFakeTarget = [];
    //     it.skip('should create 5 targets successfully', async () => {
    //         await TargetModel.deleteMany();

    //         for (let i = 0; i < 5; i++) {
    //             const response = await supertest(app)
    //                 .post('/api/targets')
    //                 .set('Authorization', `Bearer ${jwt}`)
    //                 .send({
    //                     name: multiFakeTarget[i].name,
    //                     url: multiFakeTarget[i].url,
    //                 });

    //             expect(response.status).toBe(200);
    //         }
    //     });

    //     it.skip('should fail to create more than 5 targets', async () => {
    //         const response = await supertest(app)
    //             .post('/api/targets')
    //             .set('Authorization', `Bearer ${jwt}`)
    //             .send({
    //                 name: multiFakeTarget[5].name,
    //                 url: multiFakeTarget[5].url,
    //             });

    //         expect(response.status).toBe(400);
    //     });
    // });
});
