import express, { Express, Application } from 'express';
import * as dotenv from 'dotenv';

import UserController from './controllers/UserController';
import UserService from './services/UserService';
import GroupController from './controllers/GroupController';
import GroupService from './services/GroupService';
import logger from './models/logger';
import loggerMiddleware from './handlers/logging/loggerMiddleware';
import errorMiddleware from './handlers/exceptions/errorMiddleware';
import AuthenticationController from './controllers/AuthenticationController'

const app: Express = express();
dotenv.config();

app.listen(process.env.APP_PORT, () => logger.info(`Server started at port ${process.env.APP_PORT}`));

app.use(express.json());
app.use(loggerMiddleware())
  .on('error', (error: Application) => {
    logger.error(error);
  });
app.use(errorMiddleware)
  .on('error', (error: Application) => {
    logger.error(error);
  });

app.use('/', new AuthenticationController().router);
app.use('/', new UserController(new UserService()).router);
app.use('/', new GroupController(new GroupService()).router);

process.on('uncaughtException', (err) => {
  logger.error('There was an uncaught error', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

