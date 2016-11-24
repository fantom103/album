
class User {

  constructor(email, password) {
    this._id = null;
    this.email = email;
    this.password = password;
    this.following = [];
    this.followers = [];
    this.photos = [];
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

  setFollowing(following) {
    this.following = following.concat([]);
  }

  addFollowing(user) {
    this.following.push(user);
  }

  removeFollowing(user) {
    const idx = this.following.findIndex((el) => el._id === user._id);
    this.following.splice(idx, 1);
  }

  getFollowing() {
    return this.following.concat([]);
  }

  addFollower(user) {
    this.followers.push(user);
  }

  removeFollower(user) {
    const idx = this.followers.findIndex((el) => el._id === user._id);
    this.followers.splice(idx, 1);
  }

  setFollowers(followers) {
    this.followers = followers.concat([]);
  }

  getFollowers() {
    return this.followers.concat([]);
  }

  addPhoto(photo) {
    this.photos.push(photo);
  }

  removePhoto(photo) {
    const idx = this.photos.findIndex((el) => el._id === photo._id);
    this.photos.splice(idx, 1);
  }

  setPhotos(photos) {
    this.photos = photos.concat([]);
  }

  getPhotos() {
    return this.photos.concat([]);
  }
}

module.exports = User;