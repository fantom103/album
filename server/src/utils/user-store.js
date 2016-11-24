const User = require('../model/user');
const MemoryStore = require('./memory-store');

class UserStore extends MemoryStore {

  constructor(sampleUsers) {
    super(sampleUsers, 'uuid', false, '_id');
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

  findUserById(id) {
    return super.find(id);
  }

  followUser(followerId, targetId) {
    return Promise.all([ this.find(followerId), this.find(targetId)])
      .then((values) => {
        const [follower, target] = values;
        follower.addFollowing(target);
        target.addFollower(follower);

        return Promise.all(
          [this.update(follower), this.update(target)]);
      }).then((values) => values[1]);
  }
}

module.exports = UserStore;
