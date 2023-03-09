import express, { json } from 'express';
import courses from './modules/courses/courses.routes';

const app = express();

const { PORT = 3001 } = process.env;

app.use(json());
app.use('/api/courses', courses);

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
