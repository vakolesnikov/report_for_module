import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
import config from '../config.json';

const absolutePath = path.resolve('./public');

const app = express();
app.use('/api', proxy(config.hostName));

app.get('/', (req, res) => res.sendFile(`${absolutePath}/index.html`));
app.get('/client.js', (req, res) => res.sendFile(`${absolutePath}/client.js`));

app.listen(3000);
