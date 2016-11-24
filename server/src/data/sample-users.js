const User = require('../model/user');

const users = [
  new User('juriy.bura@gmail.com', 'pass'),
  new User('neuromancer@gmail.com', 'turing'),
  new User('photographer@devrealms.com', 'photo')
];

module.exports = users;