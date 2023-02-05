import express, { Express} from 'express';

import UserController from './controllers/UserController';
import UserService from './services/UserService';
import GroupController from './controllers/GroupController';
import GroupService from './services/GroupService';

const app: Express = express();

app.listen(8000, () => console.log('Server started'));

app.use(express.json());

app.use('/', new UserController(new UserService()).router);
app.use('/', new GroupController(new GroupService()).router);

