import express, { json } from 'express';

const app = express();

const { PORT = 3001 } = process.env;

app.use(json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(`You've sent ${req.body.value}`);
});

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});
