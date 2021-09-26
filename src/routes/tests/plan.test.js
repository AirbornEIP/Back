const mongoose = require('mongoose');
const supertest = require('supertest');
const UserModel = require('../../models/UserModel');

const app = require('../../app');

const databaseName = 'test';

// eslint-disable-next-line no-undef
beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
    await UserModel.deleteMany();
});

describe('Flyplan tests', () => {
    const user = {
        email: 'test@test.fr',
        password: 'testTest',
        name: 'Mathieu',
        surname: 'Tercan',
        username: 'Mathieut',
    };

    let jwt = null;
    it('should register an user', async () => {
        const resRegister = await supertest(app)
            .post('/api/auth/register')
            .send(user);

        jwt = resRegister.body.jwtToken;

        describe('Test adding flyplan', () => {
            it('should return unauthorized error', async () => {
                const response = await supertest(app)
                    .post('/api/flyplan/add')
                    .set('Authorization', `Bearer ${jwt}1`)
                    .send({data: 'test', title: 'test'});
                expect(response.status).toBe(401);
            });
            it('should add plan', async () => {
                const response = await supertest(app)
                    .post('/api/flyplan/add')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send({data: 'test', title: 'test'});
                expect(response.status).toBe(200);
            });
        });
        describe('Test get flyplan', () => {
            it('should return unauthorized error', async () => {
                const response = await supertest(app)
                    .post('/api/flyplan/get')
                    .set('Authorization', `Bearer ${jwt}1`)
                    .send({title: 'test'});
                expect(response.status).toBe(401);
            });
            it('should get plan', async () => {
                const response = await supertest(app)
                    .post('/api/flyplan/get')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send({title: 'test'});
                expect(response.status).toBe(200);
            });
        });

        describe('Test remove flyplan', () => {
            it('should return unauthorized error', async () => {
                const response = await supertest(app)
                    .post('/api/flyplan/remove')
                    .set('Authorization', `Bearer ${jwt}1`)
                    .send({title: 'test'});
                expect(response.status).toBe(401);
            });
            it('should remove plan', async () => {
                const response = await supertest(app)
                    .post('/api/flyplan/remove')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send({title: 'test'});
                expect(response.status).toBe(200);
            });
        });
        describe('Test get all flyplan', () => {
            it('should return unauthorized error', async () => {
                const response = await supertest(app)
                    .get('/api/flyplan/getAll')
                    .set('Authorization', `Bearer ${jwt}1`)
                expect(response.status).toBe(401);
            });
            it('should get all plan', async () => {
                const response = await supertest(app)
                    .get('/api/flyplan/remove')
                    .set('Authorization', `Bearer ${jwt}`)
                expect(response.status).toBe(200);
            });
        });
    describe('Test Notam', () => {
        describe('Test Notam', () => {
            it('should return unauthorized error', async () => {
                const response = await supertest(app)
                    .post('/api/notam/get')
                    .set('Authorization', `Bearer ${jwt}1`)
                    .send({airport: "LFPG"});
                expect(response.status).toBe(401);
            });
            it('should return notam plan', async () => {
                const response = await supertest(app)
                    .post('/api/notam/get')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send({airport: "LFPG"});
                expect(response.status).toBe(200);
            });
        });
        describe('Test Vac', () => {
            describe('Test Vac', () => {
                it('should return unauthorized error', async () => {
                    const response = await supertest(app)
                        .post('/api/vac/get')
                        .set('Authorization', `Bearer ${jwt}1`)
                        .send({airport: "LFPG"});
                    expect(response.status).toBe(401);
                });
                it('should return vac plan', async () => {
                    const response = await supertest(app)
                        .post('/api/vac/get')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send({airport: "LFPG"});
                    expect(response.status).toBe(200);
                });
            });

            describe('Test Taf', () => {
                describe('Test Taf', () => {
                    it('should return unauthorized error', async () => {
                        const response = await supertest(app)
                            .post('/api/taf/get')
                            .set('Authorization', `Bearer ${jwt}1`)
                            .send({airport: "LFPG"});
                        expect(response.status).toBe(401);
                    });
                    it('should return vac plan', async () => {
                        const response = await supertest(app)
                            .post('/api/taf/get')
                            .set('Authorization', `Bearer ${jwt}`)
                            .send({airport: "LFPG"});
                        expect(response.status).toBe(200);
                    });
                });
    });
});
