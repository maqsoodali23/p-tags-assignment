import express from 'express';
import path from 'path';
import { homedir } from 'os';
import { writeFile, readFile } from 'fs';
import bodyParser from 'body-parser';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer();
const serverKey = path.resolve('./firebaseKey.json');

const storage = new Storage({ keyFilename: serverKey });
const bucketName = 'gs://meantraining-399ee.appspot.com';
const homedirectory = homedir();
const uploadingFileName = `${homedirectory}/Downloads/maqsood.png`;

const uploadFile = async () => {
  // Uploads file to the bucket
  await storage.bucket(bucketName).upload(uploadingFileName, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  console.log(`${uploadingFileName} uploaded to ${bucketName}.`);
};

uploadFile();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/file.html`);
});

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
