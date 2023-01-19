import express, { Express} from 'express';

import UserController from './controllers/UserController';
import UserService from './services/UserService';

const app: Express = express();

app.listen(8000, () => console.log('Server started'));

app.use(express.json());

app.use('/', new UserController(new UserService()).router);

