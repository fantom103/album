const User = require('../model/user');
const MemoryStore = require('./memory-store');

class UserStore extends MemoryStore {

  constructor(sampleUsers) {
    super(sampleUsers, 'uuid', true, '_id');
  }

  addUser(email, password) {
    super.add(new User(email, password));
  }

  findUser(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const value = this._data.find((u) => {
          return u.getEmail() === email && u.getPassword() === password;
        });
        value ? resolve(value) : reject(Error('Could not find user'));
      });
    });
  }

  findUsersByEmail(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = this._data.filter((u) => {
          return u.getEmail() === email;
        });
        resolve(value);
      });
    });
  }

  getUserById(id) {
    return super.find(id);
  }

}

module.exports = UserStore;
