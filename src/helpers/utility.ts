const jwt = require('jsonwebtoken');

exports.generateJwtToken = (userId: string, userEmail: string) => {
    const jwtPayload = {
        _id: userId,
        email: userEmail,
    };

    const jwtData = {
        expiresIn: process.env.JWT_TIMEOUT_DURATION,
    };
    const secret = process.env.JWT_SECRET;
    return jwt.sign(jwtPayload, secret, jwtData);
};

exports.getCurrentTimeStamp = () => Math.round((new Date()).getTime() / 1000);
