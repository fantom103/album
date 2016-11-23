const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const passport = require('passport');
const configAuth = require('./src/auth');
configAuth(passport);

const api = require('./src/api');
const config = require('./src/config');

const Store = require('./src/memory-store');
const sampleData = require('./src/sample-data');
const store = new Store(sampleData);

const app = express();
const server = http.createServer(app);

const host = config.get('api:host');
const port = process.env.PORT || config.get('api:port');

const SESSION_COOKIE_SECRET = 'secret';
const SESSION_COOKIE_NAME = 'sid';

const sessionMiddleware = session({
  name: SESSION_COOKIE_NAME,
  secret: SESSION_COOKIE_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  }
});

app.use(cors());
app.use(cookieParser(SESSION_COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api(passport, store, config));

if (config.get('serveStatic')) {
  const path = `${__dirname}/${config.get('upload:dest')}`;

  console.log('Serving static files on /upload');
  app.use('/upload', express.static(path));
}

server.listen(port, host, () => {
  console.log(`Listening to http://${host}:${port}`);
});
