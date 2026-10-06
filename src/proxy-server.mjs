import { app as serverEn } from './server/en/server.mjs';
import { app as serverBg } from './server/bg/server.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const express = require('express');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function run() {
  const port = process.env.PORT || 80;
  const server = express();

  // Redirect www.loom21.com → loom21.com (single canonical host)
  server.use((req, res, next) => {
    if (req.hostname === 'www.loom21.com') {
      return res.redirect(301, `https://loom21.com${req.originalUrl}`);
    }
    next();
  });

  server.use(express.static(__dirname));

  // Redirect root URL to /en/ with 301 status
  server.get('/', (req, res) => {
    res.redirect(301, '/en/');
  });

  server.use('/bg', serverBg());
  server.use('/en', serverEn());

  server.listen(port, '0.0.0.0', () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();