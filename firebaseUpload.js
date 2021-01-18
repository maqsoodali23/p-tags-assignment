import express from 'express';
import path from 'path';
import { homedir } from 'os';
import { writeFile, readFile } from 'fs';
import bodyParser from 'body-parser';
import multer from 'multer';
import crypto from 'crypto';
import mime from 'mime';
import { Storage } from '@google-cloud/storage';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const upload = multer({ dest: 'uploads/' });

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, `${Date.now()}.${mime.extension(file.mimetype)}`);
    });
  },
});
const upload = multer({ storage: multerStorage });

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

// uploadFile();

app.post('/uploadFile', upload.any(), (req, res) => {
  //We check the content   
  if(req.files){
    //temporary files array
    var files= [];
    var i = 0,
        len = req.files.length;

    req.files.forEach(function (file, index) {
      i++;
     let file = {
        name : file.filename,
        size : file.size,
        type : file.type,
        path : file.path
      }
      files.push(file);
      if(i == len){ 
          res.send(files);
      }
    })

  }
});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/file.html`);
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
