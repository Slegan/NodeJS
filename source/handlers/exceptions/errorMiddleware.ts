import HttpException from './HttpException';
import { NextFunction, Request, Response } from 'express';
import logger from '../../models/logger';

const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'something went wrong';
    const errorMethod = error.method || 'Is not method.';

    const defaultTab = '                                ';
    const defaultLoggerString = `${new Date().toDateString()  } ----------  ${status}  ${errorMethod} REQUEST: ${request.method}  ${request.url}\n ${defaultTab}  ${message}\n ${defaultTab}`;

    logger.error(defaultLoggerString);

    response
        .status(status)
        .send(message);

    next();
};

export default errorMiddleware;
