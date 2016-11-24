const User = require('../model/user');

const juriy = new User('juriy.bura@gmail.com', 'pass');
juriy.setId('508f5b21-990b-42bd-a534-49e36fbe858f');

const neuromancer = new User('neuromancer@gmail.com', 'turing');
neuromancer.setId('228d5f35-f860-425e-ab9d-ba4cd6f638ac');
neuromancer.setPhotos([{
  path: 'upload/sample-3.jpg',
  title: 'Layla',
  id: "09c0116a-c24d-43a7-9f93-50e9a2b4d653"
}]);

const photographer = new User('photographer@devrealms.com', 'photo');
photographer.setId("f9d8b498-8c11-401b-a8c8-9b8fa9e57aa9");
photographer.setPhotos([{
  path: 'upload/sample-4.jpg',
  title: 'Anna',
  id: "7814c912-d544-4753-b863-8df694598a87"
}]);

juriy.setFollowers([neuromancer]);
juriy.setFollowing([photographer]);
juriy.setPhotos([
  {
    path: 'upload/sample-1.jpg',
    title: 'Jessica',
    id: "90a51480-9cb5-4a73-8c44-de46f6b21222",
  },
  {
    path: 'upload/sample-2.jpg',
    title: 'Kelly',
    id: "5b9c6b47-a259-48ae-9c66-0526af6bbef0"
  }
]);

const users = [
  juriy, photographer, neuromancer
];

module.exports = users;