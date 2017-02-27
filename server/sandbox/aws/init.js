const fs = require('fs');
const AWS = require('aws-sdk');
const DynamoStore = require('../../src/utils/dynamo-store');

// AWS.config.loadFromPath('./aws.config.json');
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  "accessKeyId": "AKIAIFQAUXZTTAPXLRJA",
  "secretAccessKey": "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",
});


const docClient = new AWS.DynamoDB.DocumentClient();

const store = new DynamoStore(docClient);

const photos = [
  {
    path: 'https://s3-ap-southeast-1.amazonaws.com/amazonalbum.devrealms.com/f6a64f963926735704da0a74e6f96dec.jpg',
    title: 'Princess Mononoke',
    id: '90a51480-9cb5-4a73-8c44-de46f6b21222',
  },
  {
    path: 'https://s3-ap-southeast-1.amazonaws.com/amazonalbum.devrealms.com/8a3f98b930b1db74d810ba07e16fbb98.jpg',
    title: 'Fire Mage',
    id: "5b9c6b47-a259-48ae-9c66-0526af6bbef0"
  },
  {
    path: 'https://s3-ap-southeast-1.amazonaws.com/amazonalbum.devrealms.com/cad3d9370165ac5ba895364eab0e16ce.jpg',
    title: 'Thief',
    id: "09c0116a-c24d-43a7-9f93-50e9a2b4d653"
  },
  {
    path: 'https://s3-ap-southeast-1.amazonaws.com/amazonalbum.devrealms.com/8926ea10c49537ebeacbee3bfff8e685.jpg',
    title: 'Rogue',
    id: "7814c912-d544-4753-b863-8df694598a87"
  }
];

const turing = {
  id: 'turing',
  email: 'turing@devrealms.com',
  pass: 'pass',
  firstName: 'Alan',
  lastName: 'Turing',
  nick: 'turing',
  about: 'Can you prove that you are human?',
  address: '43 Adlington Road, Wilmslow',
  followers: [],
  following: []
};

const neuromancer = {
  id: 'neuro',
  email: 'neuromancer@devrealms.com',
  pass: 'pass',
  firstName: 'Neuromancer',
  lastName: 'Smith',
  nick: 'neuro',
  about: 'Artificial intelligence will rule the world',
  address: 'Freeside',
  followers: [],
  following: []
};

const wintermute = {
  id: 'winter',
  email: 'wintermute@devrealms.com',
  pass: 'pass',
  firstName: 'Wintermute',
  lastName: 'AI has no surname',
  nick: 'winter',
  address: 'Big Data Center',
  about: 'Programming is a form of mental yoga',
  followers: [],
  following: []
};

const users = [turing, neuromancer, wintermute];

// ------ Initialization of data model ---------

function addAllUsers() {
  const userAddPromises = users.map((u) => {
    return store.addUser(u.email, u.pass, u.firstName, u.lastName, u.nick, u.about, u.address)
      .then((user) => {
        console.log('User created', user.nick);
      });
  });

  return Promise
    .all(userAddPromises)
    .then((data) => {
      console.log('All users added');
    })
    .catch((err) => {
      console.log(err, err.stack);
    });
}

function addPhoto(target, photo) {
  return store
    .addPhoto(photo.path, photo.title, target.id, target.nick)
    .then(() => {
      console.log('Added', photo.title, 'to', target.nick);
    })
}

function follow(follower, target) {
  return store.followUser(follower.id, target.id)
    .then(() => {
      console.log(follower.id, 'is following', target.id);
    });
}

addAllUsers()
  .then(() => addPhoto(wintermute, photos[0]))
  .then(() => addPhoto(wintermute, photos[1]))
  .then(() => addPhoto(neuromancer, photos[2]))
  .then(() => addPhoto(turing, photos[3]))
  .then(() => follow(wintermute, neuromancer))
  .then(() => follow(turing, wintermute))
  .then(() => follow(turing, neuromancer));
