import express from 'express';
import path from 'path';
import { homedir } from 'os';
import { writeFile, readFile } from 'fs';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));
const homedirectory = homedir();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/file.html`);
});

const sourceFile = `${homedirectory}/Documents/12.html`;
const targetFile = `${homedirectory}/Documents/target.html`;

readFile(sourceFile, 'utf8', (err, data) => {
  if (err) throw err;
  const stripedHtml = data.replace(/<[p/>][p>]*><\/[p>]+>/g, '');
  writeFile(targetFile, stripedHtml, (err) => {});
  if (err) throw err;
  console.log('The updated file has been saved successfully');
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
