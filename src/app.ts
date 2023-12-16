import path from 'path';

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import router from './routes/index.js';

const dirname = path.resolve();

const app = express();

const apiSpec = YAML.load('src/resources/docs/api/api-spec.yaml');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, '../public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

router(app);

export default app;
