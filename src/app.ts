import express, { json } from 'express';

import './configs';

import courses from './modules/courses/courses.routes';
import { handleErrorMiddleware } from './modules/core/error-handling.core';

const app = express();

const { PORT = 3001 } = process.env;

app.disable('x-powered-by');

app.use(json());
app.use('/api/courses', courses);
app.use(handleErrorMiddleware);


app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
