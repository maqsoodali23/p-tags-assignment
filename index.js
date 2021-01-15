import express from 'express';
import { homedir } from 'os';
import { writeFile, readFile, readFileSync } from 'fs';

const app = express();
const port = 3000;

const homedirectory = homedir();
const sourceFile = `${homedirectory}/Documents/12.html`;
const targetFile = `${homedirectory}/Documents/target.html`;
readFile(sourceFile, 'utf8', (err, data) => {
  if (err) throw err;
  const stripedHtml = data.replace(/<[p/>][p>]*><\/[p>]+>/g, '');
  writeFile(targetFile, stripedHtml, (err) => {});
  if (err) throw err;
  console.log('The updated file has been saveed successfully');
}); 

app.get('/', (req, res) => {
  res.send('Welcome to the landing page');
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
