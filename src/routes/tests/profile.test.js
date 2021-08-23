/* eslint-disable no-undef */
// const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../../app');

// const database = 'mongodb://mongoDB:27017/profile-test';

describe('Profile tests', () => {
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
        email: 'test@test.test',
        password: 'password',
    };

    let jwt = null;
    it.skip('should register an user', async () => {
        const resRegister = await supertest(app)
            .post('/api/auth/register')
            .send(user);

        jwt = resRegister.body.jwtToken;
    });

    describe('Get profile', () => {
        it.skip('should return unauthorized error', async () => {
            const response = await supertest(app)
                .get('/api/profile')
                .set('Authorization', `Bearer ${jwt}1`);

            expect(response.status).toBe(401);
        });

        it.skip('should return the profile', async () => {
            const response = await supertest(app)
                .get('/api/profile')
                .set('Authorization', `Bearer ${jwt}`);

            expect(response.status).toBe(200);
            expect(response.body.email).toBe(user.email);
        });
    });
});
