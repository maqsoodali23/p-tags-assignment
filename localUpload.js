import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const port = 2000;
const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

app.post(
  '/uploadfile',
  upload.single('uploaded_file'),
  (req, res) => {
    res.send('File uploaded to local directory');
  },
);
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/uploadFile.html`);
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
