const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./src/api');
const config = require('./src/config');

const Store = require('./src/memory-store');
const sampleData = require('./src/sample-data');
const store = new Store(sampleData);

const app = express();
const server = http.createServer(app);

const host = config.get('api:host');
const port = process.env.PORT || config.get('api:port');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api(store, config));

if (config.get('serveStatic')) {
  const path = `${__dirname}/${config.get('upload:dest')}`;

  console.log('Serving static files on /upload');
  app.use('/upload', express.static(path));

  // Serving sample files too
  app.use('/upload', express.static(`${__dirname}/samples`));
}

server.listen(port, host, () => {
  console.log(`Listening to http://${host}:${port}`);
});
