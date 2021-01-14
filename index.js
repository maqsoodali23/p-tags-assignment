import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello to the future');
});
app.get('/about', (req, res) => {
  res.send('Welcome to about us page');
});

app.listen(port, () => {
  //   console.log(`App is listning to port ${port}`);
});
