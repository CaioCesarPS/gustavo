const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const curriculosRoutes = require('./routes/curriculos');
const dotenv = require('dotenv');
const setup_db = require('./controller/db');

dotenv.config();

const app = express();
const port = process.env.APP_PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', curriculosRoutes);

const privateKey = fs.readFileSync('./certificado.key', 'utf8');
const certificate = fs.readFileSync('./certificado.cert', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`HTTPS Server running on https://localhost:${port}`);
});
