
class User {

  constructor(email, password) {
    this._id = null;
    this.email = email;
    this.password = password;
  }

  setId(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}

module.exports = User;