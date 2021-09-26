/* eslint-disable no-undef */
const mongoose = require('mongoose');
const supertest = require('supertest');
const fetch = require('node-fetch');
const UserModel = require('../../models/UserModel');
const app = require('../../app');

const databaseName = 'test';

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
    await UserModel.deleteMany();

});

const user = {
    email: 'test@test.fr',
    password: 'testTest',
    name: 'Mathieu',
    surname: 'Tercan',
    username: 'Mathieut',
};

describe('Auth tests', () => {
    it('register', async () => {
        const result = await fetch('http://0.0.0.0:8080/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        expect(result.status).toBe(200);
    });

    describe('Register tests', () => {
        it('should return a validation error', async () => {
            const result = await fetch('http://0.0.0.0:8080/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email: 'test@test.fr',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            expect(result.status).toBe(400);
        });

        it('should return a duplication error', async () => {
            const result = await fetch('http://0.0.0.0:8080/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            expect(result.status).toBe(400);
        });

        describe('Login tests', () => {
            it('should return a validation error', async () => {
                const response = await supertest(app)
                    .post('/api/auth/login')
                    .send({});
                expect(response.status).toBe(400);
            });

            it('should return an unauthorized error', async () => {
                const response = await supertest(app)
                    .post('/api/auth/login')
                    .send({ email: user.email, password: `${user.password}1`});
                expect(response.status).toBe(401)
            });

            it('should login the user', async () => {
                const response = await supertest(app)
                    .post('/api/auth/login')
                    .send(user);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('jwtToken');
            });
        });
    });
});
