
class User {

  constructor(email, password) {
    this._id = null;
    this._email = email;
    this._password = password;
  }

  setId(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }

  getEmail() {
    return this._email;
  }

  getPassword() {
    return this._password;
  }
}

module.exports = User;