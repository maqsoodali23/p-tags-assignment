import express from 'express';
import path from 'path';

const app = express();
const port = 5000;
const __dirname = path.resolve(path.dirname(''));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/file.html`);
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
