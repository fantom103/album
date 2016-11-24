const User = require('../model/user');

const juriy = new User('juriy.bura@gmail.com', 'pass');
juriy.setId('508f5b21-990b-42bd-a534-49e36fbe858f');

const neuromancer = new User('neuromancer@gmail.com', 'turing');
neuromancer.setId('228d5f35-f860-425e-ab9d-ba4cd6f638ac');

const photographer = new User('photographer@devrealms.com', 'photo');
photographer.setId("f9d8b498-8c11-401b-a8c8-9b8fa9e57aa9");

juriy.setFollowers([neuromancer]);
juriy.setFollowing([photographer]);
juriy.setPhotos(['photo-1', 'photo-2']);

const users = [
  juriy, photographer, neuromancer
];

module.exports = users;