const User = require('./user');

class UserStore {

  constructor() {
    this._data = [
      new User(1, 'juriy.bura@gmail.com', 'password'),
      new User(1, 'neuromancer@gmail.com', 'turing')
    ];

    this._maxId = 1;
  }

  addUser(email, password) {
    this._data.push(new User(++this._maxId, email, password));
  }

  findUser(email, password) {
    return this._data.find((u) => {
      return u.getEmail() === email && u.getPassword() === password;
    });
  }

  getUserById(id) {
    return this._data.find((u) => {
      return u.getId() === id;
    });
  }
}

module.exports = UserStore;