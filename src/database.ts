import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { UserModel } = require('./models/User.Model.ts');
const { FlyPlanModel } = require('./models/FlyPlan.Model.ts');

const database = 'mongodb://mongoDB:27017/test';

const json = [
    {
        airportStart: {
            index: 753,
            lat: 49.4543991089,
            lng: 2.1127800941,
            name: 'Paris Beauvais Tille Airport',
            iata: 'BVA',
            message: 'Je décole de la piste 2',
            date: '2022-10-21T13:25:54.018Z',
        },
        airportEnd: {
            index: 396,
            lat: 49.1657981873,
            lng: 2.3130600452,
            name: 'Persan Beaumont Airport',
            iata: 'XYP',
            message: 'Attérisage sur la piste 3',
            date: '2022-10-21T13:55:54.018Z',
        },
        waypoints: [
            [
                49.4543991089,
                2.1127800941,
            ],
            [
                49.395556960155304,
                2.2302514632435693,
            ],
            [
                49.24655843223793,
                2.3476433458298778,
            ],
            [
                49.1657981873,
                2.3130600452,
            ],
        ],
        markers: [
            {
                name: 'Lac',
                message: 'Grand Lac',
                lat: 49.395556960155304,
                lng: 2.2302514632435693,
                date: '2022-10-21T13:35:54.018Z',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Akashi_Bridge.JPG/800px-Akashi_Bridge.JPG',
            },
            {
                name: 'Mouad',
                message: 'Berrehal',
                lat: 49.30,
                lng: 2.30,
                date: '2022-10-21T13:35:54.018Z',
                image: 'http://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf',
            },
            {
                name: 'Montagne',
                message: 'Forêt montagneuse',
                lat: 49.24655843223793,
                lng: 2.3476433458298778,
                date: '2022-10-21T13:46:54.018Z',
                image: 'https://p0.pikist.com/photos/691/67/mountain-forest-valley-sky-landscape-nature-clouds-view-environment.jpg',
            },
        ],
    },
];

async function createUser() {
    try {
        const hash = await bcrypt.hash(process.env.TEST_PASSWORD, 10);
        const result = await UserModel.findOne({ email: process.env.TEST_EMAIL });
        if (result) return (0);
        const user = new UserModel({
            email: process.env.TEST_EMAIL,
            password: hash,
            surname: process.env.TEST_SURNAME,
            name: process.env.TEST_NAME,
            admin: true,
        });
        return await user.save();
    } catch (e) {
        console.log(e);
    }
}

async function createFlyPlan() {
    try {
        const user = await UserModel.findOne({ email: process.env.TEST_EMAIL });
        const plan = await FlyPlanModel.findOne({userId: user._id, title: 'Test' });
        if (!plan) {
            const flyplan = new FlyPlanModel({
                title: 'Test',
                ownerName: user.name,
                userId: user._id,
                data: JSON.stringify(json),
            });
            return await flyplan.save();
        }
    } catch (e) {
        console.log(e);
    }
}

async function initData() {
    try {
        if (process.env.TEST_EMAIL, process.env.TEST_PASSWORD, process.env.TEST_SURNAME, process.env.TEST_NAME) {
            await createUser();
            await createFlyPlan();
        }
    } catch (e) {
        console.log(e);
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (process.env.STAGE === 'development') {
            await initData();
            console.log('user test set');
        }

        console.log('Database connected');
    } catch (err) {
        console.error('Database not connected');
    }
};

export default connectDB;
