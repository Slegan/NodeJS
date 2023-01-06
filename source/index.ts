import express, { Express} from 'express';

import router from './routes/index';

const app: Express = express();

app.listen(8000, () => console.log('Server started'));

app.use(express.json());

app.use('/', router);

