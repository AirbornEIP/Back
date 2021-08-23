exports.successResponse = (res, msg) => {
    const data = {
        message: msg,
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = (res, data) => res.status(200).json(data);

exports.errorResponse = (res, errorCode, msg) => {
    const data = {
        message: msg,
        Code: errorCode,
    };
    return res.status(500).json(data);
};

exports.notFoundResponse = (res, msg) => {
    const data = {
        message: msg,
    };
    return res.status(404).json(data);
};

exports.validationError = (res, msg) => {
    const data = {
        message: msg,
    };
    return res.status(400).json(data);
};

exports.validationErrorWithData = (res, msg, data) => {
    const resData = {
        message: msg,
        data,
    };
    return res.status(400).json(resData);
};

exports.unauthorizedResponse = (res, msg) => {
    const data = {
        message: msg,
    };
    return res.status(401).json(data);
};
