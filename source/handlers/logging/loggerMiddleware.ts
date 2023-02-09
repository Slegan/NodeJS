import { NextFunction, Request, Response } from 'express';
import logger from '../../models/logger';

const loggerMiddleware = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (request: Request, response: Response, next: NextFunction) => {
    const method = request.method;
    const url = request.url;

    const defaultLoggerString = `${new Date().toDateString()} ---------- ` + `REQUEST: ${method} ${url}\n`;
    const defaultTab = '                                ';

    // eslint-disable-next-line default-case
    switch (method) {
      case 'GET':
        logger.info(defaultLoggerString + defaultTab);
        break;
      case 'PUT':
        logger.info(`${defaultLoggerString +
          defaultTab} body: ${JSON.stringify(request.body)}\n${defaultTab}`);
        break;
      case 'POST':
        logger.info(`${defaultLoggerString +
          defaultTab} body: ${JSON.stringify(request.body)}\n${defaultTab}`);
        break;
      case 'DELETE':
        logger.info(defaultLoggerString + defaultTab);
        break;
    }

    next();
  };
};

export default loggerMiddleware;
