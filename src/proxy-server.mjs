
import { app as serverEn } from './server/en/server.mjs';
//import { app as serverEs } from './server/es/server.mjs';
import { app as serverBg } from './server/bg/server.mjs';
//import { app as serverDe } from './server/de/server.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const express = require('express');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

function run() {
  const port = process.env.PORT || 80;
  const server = express();

  server.use(express.static(__dirname));


  server.use('/bg', serverBg());
  // server.use('/de', serverDe());
  // server.use('/es', serverEs());
  server.use('/en', serverEn());
  server.use('/', serverEn());
  server.listen(port, '0.0.0.0', () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
