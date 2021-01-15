import express from 'express';
import path from 'path';
import { homedir } from 'os';
import { writeFile, readFile } from 'fs';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

app.post(
  '/uploadfile',
  upload.single('uploaded_file'),
  (req, res) => {
    console.log(req.file);
  },
);
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/file.html`);
});
// const homedirectory = homedir();
// const sourceFile = `${homedirectory}/Documents/12.html`;
// const targetFile = `${homedirectory}/Documents/target.html`;
// console.log(path.dirname(''));
// readFile(sourceFile, 'utf8', (err, data) => {
//   if (err) throw err;
//   const stripedHtml = data.replace(/<[p/>][p>]*><\/[p>]+>/g, '');
//   writeFile(targetFile, stripedHtml, (err) => {});
//   if (err) throw err;
//   console.log('The updated file has been saveed successfully');
// });

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
