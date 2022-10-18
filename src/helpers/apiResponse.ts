import express from 'express';

const { errors } = require('./constants.ts');

exports.successResponse = (res: express.Response, msg: string) => {
    const data = {
        message: msg,
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = (res: express.Response, data: any) => res.status(200).json(data);

exports.errorResponse = (res: express.Response, errorCode: number, msg: string) => {
    const data = {
        message: msg,
        Code: errorCode,
    };
    return res.status(500).json(data);
};

exports.internError = (res: express.Response, e: any) => {
    console.log(e);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.errorResponse(
        res,
        errors.interneError.code,
        errors.interneError.message,
    );
};

exports.notFoundResponse = (res: express.Response, msg: string) => {
    const data = {
        message: msg,
    };
    return res.status(404).json(data);
};

exports.validationError = (res: express.Response, msg: string) => {
    const data = {
        message: msg,
    };
    return res.status(400).json(data);
};

exports.validationErrorWithData = (res: express.Response, msg: string, data: JSON) => {
    const resData = {
        message: msg,
        data,
    };
    return res.status(400).json(resData);
};

exports.unauthorizedResponse = (res: express.Response, msg: string) => {
    const data = {
        message: msg,
    };
    return res.status(401).json(data);
};
