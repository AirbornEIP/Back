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

describe('Profile tests', () => {
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
    });

    describe('Get profile', () => {
        it('should return unauthorized error', async () => {
            const response = await supertest(app)
                .get('/api/profile/get')
                .set('Authorization', `Bearer ${jwt}1`);

            expect(response.status).toBe(401);
        });

        it('should return the profile', async () => {
            const response = await supertest(app)
                .get('/api/profile/get')
                .set('Authorization', `Bearer ${jwt}`);
            expect(response.status).toBe(200);
            // expect(response.body.email).toBe(user.email);
        });
    });

    describe('Testing Theme', () => {
        it('should return unauthorized error', async () => {
            const response = await supertest(app)
                .patch('/api/profile/changeTheme')
                .set('Authorization', `Bearer ${jwt}1`);
            expect(response.status).toBe(401);
        });

        it('should change thene to true', async () => {
            const response = await supertest(app)
                .patch('/api/profile/changeTheme')
                .set('Authorization', `Bearer ${jwt}`)
                .send({ theme: true });
            expect(response.status).toBe(200);
        });

        it('should change thene to false ', async () => {
            const response = await supertest(app)
                .patch('/api/profile/changeTheme')
                .set('Authorization', `Bearer ${jwt}`)
                .send({ theme: false });
            expect(response.status).toBe(200);
        });

        it('should get theme', async () => {
            const response = await supertest(app)
                .get('/api/profile/getTheme')
                .set('Authorization', `Bearer ${jwt}`);
            expect(response.status).toBe(200);
        });

        it('should return unauthorized get Theme', async () => {
            const response = await supertest(app)
                .patch('/api/profile/changeTheme')
                .set('Authorization', `Bearer ${jwt}1`);
            expect(response.status).toBe(401);
        });
    });
});
