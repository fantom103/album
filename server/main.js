const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const api = require('./src/api/api');
const config = require('./src/utils/config');

const MemoryStore = require('./src/utils/memory-store');
const sampleData = require('./src/data/sample-data');
const photoStore = new MemoryStore(sampleData, 'uuid', false);

const UserStore = require('./src/utils/user-store');
const sampleUsers = require('./src/data/sample-users');
const userStore = new UserStore(sampleUsers);

const passport = require('passport');
const configAuth = require('./src/utils/auth');
configAuth(passport, userStore);

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
    httpOnly: true,
    secure: false
  }
});

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));
// app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('User is',
    req.user ? req.user.getEmail() : 'not set',
    'session is [' + req.session.id + ']');
  next();
});

app.use('/api', api(passport, userStore, photoStore, config));

if (config.get('serveStatic')) {
  const path = `${__dirname}/${config.get('upload:dest')}`;

  console.log('Serving static files on /upload');
  app.use('/upload', express.static(path));
}

server.listen(port, host, () => {
  console.log(`Listening to http://${host}:${port}`);
});
