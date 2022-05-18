// eslint-disable-next-line import/extensions
import UserModel from '../models/User.Model';

// eslint-disable-next-line func-names
// exports.script = async function () {
//     // eslint-disable-next-line no-use-before-define
//     await create();
// };

async function create() {
    console.log('Create test user');
    let user;
    user = await UserModel.findOne({ email: 'test@test.fr' });
    if (!user) {
        user = new UserModel({
            email: 'test@test.fr',
            password: 'test1234',
            username: 'test',
            surname: 'Test',
            name: 'test',
        });
        await user.save();
    } else {
        console.log('user already exist');
    }
}

export default { create };
